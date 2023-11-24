import { IS_DEV } from 'configs/constants';
import tracer from 'dd-trace';
import formats from 'dd-trace/ext/formats';
import { addColors, createLogger, format, transports } from 'winston';

// This flattens the object from morgan
const formatHttpRequest = format((info) => {
  const { level, message, ...restInfo } = info;
  if (level !== 'http') return false;
  const span = tracer.scope().active();
  const httpRequest = JSON.parse(message);
  const record = { level, ...httpRequest, ...restInfo };

  if (span) {
    tracer.inject(span.context(), formats.LOG, record);
  }

  return record;
});

const formatInfo = format((info) => {
  const span = tracer.scope().active();

  if (span) {
    tracer.inject(span.context(), formats.LOG, info);
  }

  return info;
});

function createProductionLogger() {
  return createLogger({
    transports: [
      new transports.Console({
        level: 'info',
        format: format.combine(formatInfo(), format.json()),
      }),
      new transports.Console({
        level: 'http',
        format: format.combine(formatHttpRequest(), format.json()),
      }),
    ],
    exitOnError: false,
  });
}

function createDevelopmentLogger() {
  const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };

  addColors(colors);

  return createLogger({
    level: 'debug',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      format.colorize(),
      format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
      ),
    ),
    transports: [new transports.Console()],
    exitOnError: false,
  });
}

const logger = IS_DEV ? createDevelopmentLogger() : createProductionLogger();

export default logger;
