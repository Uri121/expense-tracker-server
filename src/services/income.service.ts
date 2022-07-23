import { IIncomeDocument, IncomeModel } from './../models/income.model';
import mongoose, { DocumentDefinition } from 'mongoose';

const { ObjectId } = mongoose.Types;

const incomeService = {
  addIncome: async (
    userId: typeof ObjectId,
    input: DocumentDefinition<Partial<IIncomeDocument>>
  ): Promise<IIncomeDocument> => {
    try {
      input.userId = userId;

      return await IncomeModel.create(input);
    } catch (error: unknown) {
      throw error;
    }
  },
};

export default incomeService;
