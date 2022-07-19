import successResponse from '../responseHandlers/successResponse';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../middleware/logger';

const userController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser = await userService.createUser(req.body);
      logger.info(`user created successfully ${JSON.stringify(createdUser)}`);
      return successResponse(
        res,
        'user created successfully',
        createdUser,
        200
      );
    } catch (error: unknown) {
      next(error);
    }
  },
  signUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = userService.signUser(req.body);
      logger.info(`token has been issued successfully`);
      successResponse(res, 'token has been issued successfully', token, 200);
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default userController;
