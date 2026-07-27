import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { sha256 } from '@noble/hashes/sha2';
import { Prisma, BackgroundJobStatus } from '@prisma/client';
import { CronExpressionParser } from 'cron-parser';
import { NEXT_PRIVATE_INTERNAL_WEBAPP_URL } from '../../constants/app.js';
import { sign } from '../../server-only/crypto/sign.js';
import { verify } from '../../server-only/crypto/verify.js';
import { ZSimpleTriggerJobOptionsSchema } from './_internal/job.js';
import { BaseJobProvider } from './base.js';

/**
 * Build a deterministic BackgroundJob ID for a cron run so that multiple
 * instances of the local provider racing to enqueue the same slot will
 * collide on the primary key instead of creating duplicates.
 */
const createCronRunId = (jobId, scheduledFor) => {
  const key = `cron:${jobId}:${scheduledFor.toISOString()}`;
  const hash = Buffer.from(sha256(key)).toString('hex').slice(0, 24);
  return `cron_${hash}`;
};
const CRON_POLL_INTERVAL_MS = 30_000; // 30 seconds
const CRON_POLL_JITTER_MS = 5_000; // 0-5 seconds random offset
class LocalJobProvider extends BaseJobProvider {
  _jobDefinitions = {};
  _cronJobs = [];
  _cronPoller = null;
  constructor() {
    super();
  }
  static getInstance() {
    if (!LocalJobProvider._instance) {
      LocalJobProvider._instance = new LocalJobProvider();
    }
    return LocalJobProvider._instance;
  }
  defineJob(definition) {
    this._jobDefinitions[definition.id] = {
      ...definition,
      enabled: definition.enabled ?? true
    };
    if (definition.trigger.cron && definition.enabled !== false) {
      const alreadyRegistered = this._cronJobs.some(job => job.definition.id === definition.id);
      if (!alreadyRegistered) {
        this._cronJobs.push({
          definition: {
            ...definition,
            enabled: definition.enabled ?? true
          },
          cron: definition.trigger.cron,
          lastTickAt: new Date()
        });
        console.log(`[JOBS]: Registered cron job ${definition.id} (${definition.trigger.cron})`);
      }
    }
  }
  /**
   * Start the single cron poller for all registered cron jobs.
   *
   * Must be called explicitly at application startup after all jobs have been
   * defined. The poller runs every 30 seconds (+ random jitter to avoid
   * thundering herd across instances) and evaluates all registered cron jobs
   * for due slots.
   *
   * For each due slot it creates a BackgroundJob row with a deterministic ID.
   * If the insert succeeds the job is dispatched; if it fails with a unique
   * constraint violation (P2002) another instance already claimed that slot.
   */
  startCron() {
    if (this._cronPoller) {
      return;
    }
    if (this._cronJobs.length === 0) {
      return;
    }
    const tick = () => {
      const jitter = Math.floor(Math.random() * CRON_POLL_JITTER_MS);
      this._cronPoller = setTimeout(() => {
        void this.processCronTick().finally(tick);
      }, CRON_POLL_INTERVAL_MS + jitter);
    };
    tick();
    console.log(`[JOBS]: Started cron poller for ${this._cronJobs.length} job(s)`);
  }
  async processCronTick() {
    for (const cronJob of this._cronJobs) {
      try {
        const dueSlots = this.getDueCronSlots(cronJob);
        cronJob.lastTickAt = new Date();
        if (dueSlots.length === 0) {
          continue;
        }
        // Only take the latest slot — sweep-style jobs don't need to catch up
        // every missed slot after downtime, just the most recent one.
        const scheduledFor = dueSlots[dueSlots.length - 1];
        const deterministicId = createCronRunId(cronJob.definition.id, scheduledFor);
        const pendingJob = await prismaWithReplicas.backgroundJob.create({
          data: {
            id: deterministicId,
            jobId: cronJob.definition.id,
            name: cronJob.definition.name,
            version: cronJob.definition.version,
            payload: {
              scheduledFor: scheduledFor.toISOString()
            }
          }
        }).catch(error => {
          // P2002 = unique constraint violation — another instance already enqueued this slot.
          if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return null;
          }
          throw error;
        });
        if (!pendingJob) {
          continue;
        }
        await this.submitJobToEndpoint({
          jobId: pendingJob.id,
          jobDefinitionId: pendingJob.jobId,
          data: {
            name: cronJob.definition.trigger.name,
            payload: {
              scheduledFor: scheduledFor.toISOString()
            }
          },
          isRetry: false
        });
      } catch (error) {
        console.error(`[JOBS]: Cron tick failed for ${cronJob.definition.id}`, error);
      }
    }
  }
  /**
   * Use cron-parser to find all cron slots that are due between the last tick
   * and now.
   */
  getDueCronSlots(cronJob) {
    const expr = CronExpressionParser.parse(cronJob.cron, {
      currentDate: cronJob.lastTickAt
    });
    const now = new Date();
    const slots = [];
    let next = expr.next();
    while (next.toDate() <= now) {
      slots.push(next.toDate());
      next = expr.next();
    }
    return slots;
  }
  async triggerJob(options) {
    const eligibleJobs = Object.values(this._jobDefinitions).filter(job => job.trigger.name === options.name);
    await Promise.all(eligibleJobs.map(async job => {
      // Ideally we will change this to a createMany with returning later once we upgrade Prisma
      // @see: https://github.com/prisma/prisma/releases/tag/5.14.0
      const pendingJob = await prismaWithReplicas.backgroundJob.create({
        data: {
          jobId: job.id,
          name: job.name,
          version: job.version,
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          payload: options.payload
        }
      });
      await this.submitJobToEndpoint({
        jobId: pendingJob.id,
        jobDefinitionId: pendingJob.jobId,
        data: options,
        isRetry: false
      });
    }));
  }
  getApiHandler() {
    return async c => {
      const req = c.req;
      if (req.method !== 'POST') {
        return c.text('Method not allowed', 405);
      }
      const jobId = req.header('x-job-id');
      const signature = req.header('x-job-signature');
      const isRetry = req.header('x-job-retry') !== undefined;
      const options = await req.json().then(async data => ZSimpleTriggerJobOptionsSchema.parseAsync(data))
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .then(data => data).catch(() => null);
      if (!options) {
        return c.text('Bad request', 400);
      }
      const definition = this._jobDefinitions[options.name];
      if (typeof jobId !== 'string' || typeof signature !== 'string' || typeof options !== 'object') {
        return c.text('Bad request', 400);
      }
      if (!definition) {
        return c.text('Job not found', 404);
      }
      if (definition && !definition.enabled) {
        console.log('Attempted to trigger a disabled job', options.name);
        return c.text('Job not found', 404);
      }
      if (!signature || !verify(options, signature)) {
        return c.text('Unauthorized', 401);
      }
      let payload = options.payload;
      if (definition.trigger.schema) {
        const result = definition.trigger.schema.safeParse(payload);
        if (!result.success) {
          return c.text('Bad request', 400);
        }
        payload = result.data;
      }
      console.log(`[JOBS]: Triggering job ${options.name} with payload`, payload);
      let backgroundJob = await prismaWithReplicas.backgroundJob.update({
        where: {
          id: jobId,
          status: BackgroundJobStatus.PENDING
        },
        data: {
          status: BackgroundJobStatus.PROCESSING,
          retried: {
            increment: isRetry ? 1 : 0
          },
          lastRetriedAt: isRetry ? new Date() : undefined
        }
      }).catch(() => null);
      if (!backgroundJob) {
        return c.text('Job not found', 404);
      }
      try {
        await definition.handler({
          payload,
          io: this.createJobRunIO(jobId)
        });
        backgroundJob = await prismaWithReplicas.backgroundJob.update({
          where: {
            id: jobId,
            status: BackgroundJobStatus.PROCESSING
          },
          data: {
            status: BackgroundJobStatus.COMPLETED,
            completedAt: new Date()
          }
        });
      } catch (error) {
        console.log(`[JOBS]: Job ${options.name} failed`, error);
        const taskHasExceededRetries = error instanceof BackgroundTaskExceededRetriesError;
        const jobHasExceededRetries = backgroundJob.retried >= backgroundJob.maxRetries && !(error instanceof BackgroundTaskFailedError);
        if (taskHasExceededRetries || jobHasExceededRetries) {
          backgroundJob = await prismaWithReplicas.backgroundJob.update({
            where: {
              id: jobId,
              status: BackgroundJobStatus.PROCESSING
            },
            data: {
              status: BackgroundJobStatus.FAILED,
              completedAt: new Date()
            }
          });
          return c.text('Task exceeded retries', 500);
        }
        backgroundJob = await prismaWithReplicas.backgroundJob.update({
          where: {
            id: jobId,
            status: BackgroundJobStatus.PROCESSING
          },
          data: {
            status: BackgroundJobStatus.PENDING
          }
        });
        await this.submitJobToEndpoint({
          jobId,
          jobDefinitionId: backgroundJob.jobId,
          data: options,
          isRetry: true
        });
      }
      return c.text('OK', 200);
    };
  }
  async submitJobToEndpoint(options) {
    const {
      jobId,
      jobDefinitionId,
      data,
      isRetry
    } = options;
    const endpoint = `${NEXT_PRIVATE_INTERNAL_WEBAPP_URL()}/api/jobs/${jobDefinitionId}/${jobId}`;
    const signature = sign(data);
    const headers = {
      'Content-Type': 'application/json',
      'X-Job-Id': jobId,
      'X-Job-Signature': signature
    };
    if (isRetry) {
      headers['X-Job-Retry'] = '1';
    }
    console.log('Submitting job to endpoint:', endpoint);
    await Promise.race([fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers
    }).catch(() => null), new Promise(resolve => {
      setTimeout(resolve, 150);
    })]);
  }
  createJobRunIO(jobId) {
    return {
      runTask: async (cacheKey, callback) => {
        const hashedKey = Buffer.from(sha256(cacheKey)).toString('hex');
        let task = await prismaWithReplicas.backgroundJobTask.findFirst({
          where: {
            id: `task-${hashedKey}--${jobId}`,
            jobId
          }
        });
        if (!task) {
          task = await prismaWithReplicas.backgroundJobTask.create({
            data: {
              id: `task-${hashedKey}--${jobId}`,
              name: cacheKey,
              jobId,
              status: BackgroundJobStatus.PENDING
            }
          });
        }
        if (task.status === BackgroundJobStatus.COMPLETED) {
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          return task.result;
        }
        if (task.retried >= 3) {
          throw new BackgroundTaskExceededRetriesError('Task exceeded retries');
        }
        try {
          const result = await callback();
          task = await prismaWithReplicas.backgroundJobTask.update({
            where: {
              id: task.id,
              jobId
            },
            data: {
              status: BackgroundJobStatus.COMPLETED,
              result: result === null ? Prisma.JsonNull : result,
              completedAt: new Date()
            }
          });
          return result;
        } catch (err) {
          task = await prismaWithReplicas.backgroundJobTask.update({
            where: {
              id: task.id,
              jobId
            },
            data: {
              status: BackgroundJobStatus.PENDING,
              retried: {
                increment: 1
              }
            }
          });
          console.log(`[JOBS:${task.id}] Task failed`, err);
          throw new BackgroundTaskFailedError('Task failed');
        }
      },
      triggerJob: async (_cacheKey, payload) => await this.triggerJob(payload),
      logger: {
        debug: (...args) => console.debug(`[${jobId}]`, ...args),
        error: (...args) => console.error(`[${jobId}]`, ...args),
        info: (...args) => console.info(`[${jobId}]`, ...args),
        log: (...args) => console.log(`[${jobId}]`, ...args),
        warn: (...args) => console.warn(`[${jobId}]`, ...args)
      },
      // eslint-disable-next-line @typescript-eslint/require-await
      wait: async () => {
        throw new Error('Not implemented');
      }
    };
  }
}
class BackgroundTaskFailedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BackgroundTaskFailedError';
  }
}
class BackgroundTaskExceededRetriesError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BackgroundTaskExceededRetriesError';
  }
}

export { LocalJobProvider };
//# sourceMappingURL=local.js.map
