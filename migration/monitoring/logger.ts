import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format:
    process.env.NODE_ENV === 'development'
      ? format.cli()
      : format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});

export default logger;
