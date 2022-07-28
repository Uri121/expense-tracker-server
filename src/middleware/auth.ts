import { IUserDocument } from './../models/user.model';
import { Request, Response, NextFunction } from 'express';
import { validateJwt } from '../utils/jwt.utils';
import userService from '../services/user.service';
declare module 'express-serve-static-core' {
  interface Request {
    currentUser: IUserDocument | null;
  }
}

/**
 * checking if token is exist in the request and validate it
 *
 * @param req express request object
 * @param res express response object
 * @param next express next function
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) throw new Error('Unauthorized');
    const { decoded, expired } = validateJwt(accessToken);
    if (decoded) req.currentUser = decoded;

    //reissue accessToken if the refreshToken is valid and token is expired
    if (expired && refreshToken) {
      const newToken = await userService.reIssueAccessToken(refreshToken);

      if (!newToken) throw new Error('something went wrong');

      res.cookie('accessToken', accessToken, { maxAge: 9000, httpOnly: true, secure: true });
      const { decoded } = validateJwt(newToken);
      if (decoded) req.currentUser = decoded;
    }

    next();
  } catch (error: unknown) {
    req.currentUser = null;
    next(error);
  }
};
