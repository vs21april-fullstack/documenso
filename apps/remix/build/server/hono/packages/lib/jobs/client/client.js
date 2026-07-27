import { match } from 'ts-pattern';
import { env } from '../../utils/env.js';
import { BullMQJobProvider } from './bullmq.js';
import { InngestJobProvider } from './inngest.js';
import { LocalJobProvider } from './local.js';

class JobClient {
  constructor(definitions) {
    this._provider = match(env('NEXT_PRIVATE_JOBS_PROVIDER')).with('inngest', () => InngestJobProvider.getInstance()).with('bullmq', () => BullMQJobProvider.getInstance()).otherwise(() => LocalJobProvider.getInstance());
    definitions.forEach(definition => {
      this._provider.defineJob(definition);
    });
  }
  async triggerJob(options) {
    return this._provider.triggerJob(options);
  }
  getApiHandler() {
    return this._provider.getApiHandler();
  }
  /**
   * Start the cron scheduler for any registered cron jobs.
   *
   * Call this once at application startup after the instance is ready to
   * process requests. No-op for providers that handle cron externally
   * (e.g. Inngest).
   */
  startCron() {
    this._provider.startCron();
  }
}

export { JobClient };
//# sourceMappingURL=client.js.map
