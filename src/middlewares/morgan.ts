import morgan from 'morgan';
import logger from 'monitoring/logger';
import { IS_DEV } from 'configs/constants';

export const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  ':method :url :status :response-time ms - :res[content-length]',
  {
    stream: { write: (message) => logger.info(message) },
    skip: () => !IS_DEV,
  },
);
