import { Request, Response, NextFunction } from 'express';
import { validateJwt } from '../utils/jwt.utils';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error('token is needed');
    const isValid = validateJwt(token);
    if (!isValid) throw new Error('token is invalid');
    next();
  } catch (error: unknown) {
    next(error);
  }
};
