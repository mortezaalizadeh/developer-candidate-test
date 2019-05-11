import Path from 'path';
import { createLogger, format, transports } from 'winston';

const errorLogFileFullPath = process.env.ERROR_LOG_FILE_FULLPATH ? process.env.ERROR_LOG_FILE_FULLPATH : Path.join(__dirname, '..', 'error.log');
const combinedLogFileFullPath = process.env.COMBINED_LOG_FILE_FULLPATH
  ? process.env.COMBINED_LOG_FILE_FULLPATH
  : Path.join(__dirname, '..', 'combined.log');
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
const { combine, timestamp, prettyPrint, printf } = format;
const singleLineFormatter = printf(({ level, message, timestamp }) => {
  return `${level} - ${timestamp} - ${message}`;
});
const logger = createLogger({
  level: logLevel,
  format: combine(timestamp(), prettyPrint()),
  defaultMeta: { service: 'user-service' },
  transports: [new transports.File({ filename: errorLogFileFullPath, level: 'error' }), new transports.File({ filename: combinedLogFileFullPath })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      level: 'debug',
      format: combine(timestamp(), singleLineFormatter),
    }),
  );
}

export default logger;
