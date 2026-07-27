class BaseJobProvider {
  // eslint-disable-next-line @typescript-eslint/require-await
  async triggerJob(_options) {
    throw new Error('Not implemented');
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  defineJob(_job) {
    throw new Error('Not implemented');
  }
  getApiHandler() {
    throw new Error('Not implemented');
  }
  /**
   * Start the cron scheduler for any registered cron jobs.
   *
   * No-op for providers that handle cron scheduling externally (e.g. Inngest).
   * Must be called explicitly at application startup.
   */
  startCron() {
    // No-op by default — providers override if needed.
  }
}

export { BaseJobProvider };
//# sourceMappingURL=base.js.map
