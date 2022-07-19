import { Response } from 'express';

const errorResponse = (res: Response, error: Error) => {
  res.status(500).send(error);
};
export default errorResponse;
