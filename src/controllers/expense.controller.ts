import { Request, Response, NextFunction } from 'express';
import { logger } from '../middleware/logger';
import successResponse from '../responseHandlers/successResponse';
import expenseService from '../services/expense.service';
import { getUserId } from '../utils/currentUser.utils';

const expenseController = {
  createExpense: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getUserId(req);
      const expense = await expenseService.createExpense(userId, req.body);
      logger.info('expense was created successfully', expense.toJSON());
      successResponse(res, 'expense was created successfully', expense);
    } catch (error: unknown) {
      next(error);
    }
  },
  getExpenses: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getUserId(req);
      const expenses = await expenseService.getExpenses(userId, req.body);
      logger.info('got expenses', expenses);
      successResponse(res, 'got expenses', expenses);
    } catch (error: unknown) {
      next(error);
    }
  },
  expenseFromExcel: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getUserId(req);
      const expenses = await expenseService.expenseFromExcel(userId, req.file);
      logger.info('expenses was created successfully');
      successResponse(res, 'expenses was created successfully', expenses);
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default expenseController;
