import Path from 'path';
import { createLogger, format, transports } from 'winston';

const errorLogFileFullPath = process.env.ERROR_LOG_FILE_FULLPATH ? process.env.ERROR_LOG_FILE_FULLPATH : Path.join(__dirname, '..', 'error.log');
const combinedLogFileFullPath = process.env.COMBINED_LOG_FILE_FULLPATH
  ? process.env.COMBINED_LOG_FILE_FULLPATH
  : Path.join(__dirname, '..', 'all.log');

// the desired log level, if not set by the env variable, the default value will be `info`
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
const { combine, timestamp, prettyPrint, printf } = format;

// creates the logger, we would like to have all the logs in one file as well as anything with error and more severe levels in a different file
const logger = createLogger({
  level: logLevel,
  format: combine(timestamp(), prettyPrint()),
  defaultMeta: { service: 'user-service' },
  transports: [new transports.File({ filename: errorLogFileFullPath, level: 'error' }), new transports.File({ filename: combinedLogFileFullPath })],
});

// only enable console logging if we are running the application in development environment
if (process.env.NODE_ENV !== 'production') {
  // single line formtter will be used only by the console logger in development environment to save space on the terminal running the application
  const singleLineFormatter = printf(({ level, message, timestamp }) => {
    return `${level} - ${timestamp} - ${message}`;
  });

  // the desired development log level, if not set by the env variable, the default value will be `info`
  const developmentLogLevel = process.env.DEVELOPMENT_LOG_LEVEL ? process.env.DEVELOPMENT_LOG_LEVEL : 'info';

  logger.add(
    new transports.Console({
      level: developmentLogLevel,
      format: combine(timestamp(), singleLineFormatter),
    }),
  );
}

export default logger;
