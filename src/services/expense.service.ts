import { IExpenseDocument, ExpenseModel } from '../models/expense.model';
import { DocumentDefinition } from 'mongoose';

const expenseService = {
  createExpense: async (userId: string, input: DocumentDefinition<IExpenseDocument>): Promise<IExpenseDocument> => {
    try {
      input.userId = userId;
      return await ExpenseModel.create(input);
    } catch (error) {
      throw error;
    }
  },
};

export default expenseService;
