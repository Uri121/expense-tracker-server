import { logger } from './../middleware/logger';
import { Request, Response, NextFunction } from 'express';
import successResponse from '../responseHandlers/successResponse';
import incomeService from '../services/income.service';
import { getUserId } from '../utils/currentUser.utils';

const incomeController = {
  /**
   * trigger the income service create function
   *
   * @param req express Request object
   * @param res express Response object
   * @param next express Next function
   */
  addIncome: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getUserId(req);
      const addedIncome = await incomeService.addIncome(userId, req.body);
      logger.info(`income was added successfully ${addedIncome}`);
      successResponse(res, 'income was added successfully', addedIncome);
    } catch (error: unknown) {
      next(error);
    }
  },
  /**
   * trigger the income service get function
   *
   * @param req express Request object
   * @param res express Response object
   * @param next express Next function
   */
  getIncome: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getUserId(req);
      const income = await incomeService.getIncome(userId, req.query);
      logger.info('got income', income);
      successResponse(res, 'income was fetched successfully', income);
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default incomeController;
