import { Inngest } from 'inngest';
import { serve } from 'inngest/hono';
import { env } from '../../utils/env.js';
import { BaseJobProvider } from './base.js';

class InngestJobProvider extends BaseJobProvider {
  _functions = [];
  constructor(options) {
    super();
    this._client = options.client;
  }
  static getInstance() {
    if (!InngestJobProvider._instance) {
      const client = new Inngest({
        id: env('NEXT_PRIVATE_INNGEST_APP_ID') || 'documenso-app',
        eventKey: env('INNGEST_EVENT_KEY') || env('NEXT_PRIVATE_INNGEST_EVENT_KEY'),
        logger: console
      });
      InngestJobProvider._instance = new InngestJobProvider({
        client
      });
    }
    return InngestJobProvider._instance;
  }
  defineJob(job) {
    const triggerConfig = job.trigger.cron ? {
      cron: job.trigger.cron
    } : {
      event: job.trigger.name
    };
    const fn = this._client.createFunction({
      id: job.id,
      name: job.name,
      optimizeParallelism: job.optimizeParallelism ?? false
    }, triggerConfig, async ctx => {
      const io = this.convertInngestIoToJobRunIo(ctx);
      // We need to cast to any so we can deal with parsing later.
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
      let payload = ctx.event.data;
      if (job.trigger.schema) {
        payload = job.trigger.schema.parse(payload);
      }
      await job.handler({
        payload,
        io
      });
    });
    this._functions.push(fn);
  }
  async triggerJob(options) {
    await this._client.send({
      id: options.id,
      name: options.name,
      data: options.payload,
      ts: options.timestamp
    });
  }
  getApiHandler() {
    return async context => {
      const handler = serve({
        client: this._client,
        functions: this._functions
      });
      return await handler(context);
    };
  }
  convertInngestIoToJobRunIo(ctx) {
    const {
      step
    } = ctx;
    return {
      wait: step.sleep,
      logger: {
        info: ctx.logger.info,
        debug: ctx.logger.debug,
        error: ctx.logger.error,
        warn: ctx.logger.warn,
        log: ctx.logger.info
      },
      runTask: async (cacheKey, callback) => {
        const result = await step.run(cacheKey, callback);
        // !: Not dealing with this right now but it should be correct.
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
        return result;
      },
      triggerJob: async (cacheKey, payload) => step.sendEvent(cacheKey, {
        ...payload,
        timestamp: payload.timestamp
      })
    };
  }
}

export { InngestJobProvider };
//# sourceMappingURL=inngest.js.map
