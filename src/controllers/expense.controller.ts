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
      logger.info('expense was created successfully', expense);
      successResponse(res, 'expense was created successfully', expense);
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default expenseController;
