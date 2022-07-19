import { NextFunction, Response, Request } from 'express';
import winston, { format } from 'winston';
const { combine, timestamp, colorize, prettyPrint } = format;
import 'dotenv/config';
import errorResponse from '../responseHandlers/errorResponse';

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
  const { url, method } = req;
  logger.info(`${method}:${url}`);
  next();
};

export const errorMiddleWare = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.message);
  errorResponse(res, error);
};
