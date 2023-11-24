import './monitoring/datadog';

import { PORT } from 'configs/constants';
import { app } from 'app';
import logger from 'monitoring/logger';

const server = app.listen(PORT, () => {
  logger.info(`✅ App is listening on port: ${PORT}`);
});

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

function gracefulShutdown() {
  logger.info('SIGINT signal received: closing HTTP server');

  server.close(() => {
    logger.info('HTTP server closed');
  });
}
