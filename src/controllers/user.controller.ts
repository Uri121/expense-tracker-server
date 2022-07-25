import successResponse from '../responseHandlers/successResponse';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../middleware/logger';

const RES_CODE = 200;

const userController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser = await userService.createUser(req.body);
      logger.info('user created successfully', createdUser);
      return successResponse(res, 'user created successfully', createdUser, RES_CODE);
    } catch (error: unknown) {
      next(error);
    }
  },
  signUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await userService.signUser(req.body);
      logger.info('token has been issued successfully');
      res.cookie('token', token, { maxAge: 9000, httpOnly: true, secure: true });
      successResponse(res, 'token has been issued successfully', token, RES_CODE);
    } catch (error: unknown) {
      next(error);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.currentUser = null;
      res.clearCookie('token');
      successResponse(res, 'user has logged out', {}, RES_CODE);
    } catch (error: unknown) {
      next(error);
    }
  },
  getUserByEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getUserByEmail(req.query);
      logger.info('user was found', user);
      successResponse(res, 'user was found', user, RES_CODE);
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default userController;
