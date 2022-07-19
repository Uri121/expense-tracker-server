import { Response } from 'express';

const successResponse = (
  res: Response,
  msg: string,
  body: object,
  statusCode: number
) => {
  res.status(statusCode).send({ msg, body });
};
export default successResponse;
