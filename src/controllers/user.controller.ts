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
};

export default userController;
