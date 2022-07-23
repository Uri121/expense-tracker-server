import { IUserDocument } from './../models/user.model';
import { Request, Response, NextFunction } from 'express';
import { validateJwt } from '../utils/jwt.utils';
declare module 'express-serve-static-core' {
  interface Request {
    currentUser: IUserDocument | null;
  }
}

/**
 * checking if token is exist in the request and validate it
 *
 * todo make a re issue logic and add refresh token in the system
 *
 * @param req express request object
 * @param res express response object
 * @param next express next function
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error('token is needed');
    const { decoded, expired, error } = validateJwt(token);

    if (error) throw error;
    if (decoded) req.currentUser = decoded;

    next();
  } catch (error: unknown) {
    req.currentUser = null;
    next(error);
  }
};
