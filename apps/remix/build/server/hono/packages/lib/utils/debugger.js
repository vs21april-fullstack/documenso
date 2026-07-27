import { env } from './env.js';

/**
 * Which areas to debug, keyed by context.
 */
const debugging = {
  auth: env('NEXT_DEBUG_AUTH') === 'true',
  job: env('NEXT_DEBUG_JOB') === 'true',
  middleware: env('NEXT_DEBUG_MIDDLEWARE') === 'true'
};
const appLog = (context, ...args) => {
  if (debugging[context.toLowerCase()] === false) {
    return;
  }
  if (env('NEXT_DEBUG') === 'true') {
    console.log(`[${context}]: ${args[0]}`, ...args.slice(1));
  }
};
class AppDebugger {
  constructor(context) {
    this.context = context;
  }
  log(...args) {
    appLog(this.context, ...args);
  }
}

export { AppDebugger, appLog };
//# sourceMappingURL=debugger.js.map
