import { pino } from 'pino';
import '../universal/extract-request-metadata.js';
import { env } from './env.js';

const transports = [];
if (env('NODE_ENV') !== 'production' && !env('INTERNAL_FORCE_JSON_LOGGER')) {
  transports.push({
    target: 'pino-pretty',
    level: 'info'
  });
}
const loggingFilePath = env('NEXT_PRIVATE_LOGGER_FILE_PATH');
if (loggingFilePath) {
  transports.push({
    target: 'pino/file',
    level: 'info',
    options: {
      destination: loggingFilePath,
      mkdir: true
    }
  });
}
const logger = pino({
  level: 'info',
  transport: transports.length > 0 ? {
    targets: transports
  } : undefined
});

export { logger };
//# sourceMappingURL=logger.js.map
