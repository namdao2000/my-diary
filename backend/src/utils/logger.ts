import winston from 'winston';
import { NODE_ENV } from './constants';

const { createLogger, format, transports, config } = winston;

export const logger = createLogger({
  levels: config.syslog.levels,
  level: process.env.LOG_LEVEL,
  format:
    NODE_ENV === 'PRODUCTION'
      ? format.json()
      : format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
  exitOnError: false,
});
