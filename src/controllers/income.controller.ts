import { logger } from './../middleware/logger';
import { Request, Response, NextFunction } from 'express';
import successResponse from '../responseHandlers/successResponse';
import incomeService from '../services/income.service';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

const incomeController = {
  addIncome: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.currentUser?._id as typeof ObjectId;
      const addedIncome = await incomeService.addIncome(userId, req.body);
      logger.info(`income was added successfully ${addedIncome}`);
      successResponse(res, 'income was added successfully', addedIncome, 200);
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default incomeController;
