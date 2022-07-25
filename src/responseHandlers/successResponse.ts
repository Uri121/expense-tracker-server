import { Response } from 'express';

const statusCode = 200;
const successResponse = (res: Response, msg: string, body: Object) => {
  res.status(statusCode).send({ msg, body });
};
export default successResponse;
