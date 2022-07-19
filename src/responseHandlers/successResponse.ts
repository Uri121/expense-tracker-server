import { Response } from 'express';

const successResponse = (
  res: Response,
  msg: string,
  body: Object,
  statusCode: number
) => {
  res.status(statusCode).send({ msg, body });
};
export default successResponse;
