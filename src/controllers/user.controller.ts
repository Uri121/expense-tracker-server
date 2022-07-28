import successResponse from '../responseHandlers/successResponse';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../middleware/logger';

const userController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser = await userService.createUser(req.body);
      logger.info('user created successfully', createdUser);
      return successResponse(res, 'user created successfully', createdUser);
    } catch (error: unknown) {
      next(error);
    }
  },
  signUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken } = await userService.signUser(req.body);
      logger.info('token has been issued successfully');
      res.cookie('accessToken', accessToken, { maxAge: 9000, httpOnly: true, secure: true });
      res.cookie('refreshToken', refreshToken, { maxAge: 9000, httpOnly: true, secure: true });
      successResponse(res, 'token has been issued successfully', { accessToken, refreshToken });
    } catch (error: unknown) {
      next(error);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.currentUser = null;
      res.clearCookie('token');
      successResponse(res, 'user has logged out', {});
    } catch (error: unknown) {
      next(error);
    }
  },
  getUserByEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getUserByEmail(req.query);
      logger.info('user was found', user);
      successResponse(res, 'user was found', user);
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default userController;
