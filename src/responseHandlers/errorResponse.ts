import { Response } from 'express';

const ERR_STATUS = 500;
const errorResponse = (res: Response, error: Error) => {
  res.status(ERR_STATUS).send(error);
};
export default errorResponse;
