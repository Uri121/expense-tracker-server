import { NextFunction, Response, Request } from 'express';
import winston, { format } from 'winston';
const { combine, timestamp, colorize, prettyPrint } = format;
import 'dotenv/config';

const logConfiguration = {
  lever: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.json(),
    }),
  ],

  format: combine(format.simple(), timestamp(), colorize()),
};

export const logger = winston.createLogger(logConfiguration);

export const loggerMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url, method, query } = req;
  logger.info(`${method}:${url}`);
  next();
};
