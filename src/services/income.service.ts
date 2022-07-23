import { IIncomeDocument, IncomeModel } from './../models/income.model';
import { DocumentDefinition } from 'mongoose';

const incomeService = {
  addIncome: async (userId: string, input: DocumentDefinition<Partial<IIncomeDocument>>): Promise<IIncomeDocument> => {
    try {
      input.userId = userId;

      return await IncomeModel.create(input);
    } catch (error: unknown) {
      throw error;
    }
  },
  getIncome: async (
    userId: string,
    input: DocumentDefinition<Partial<IIncomeDocument>>
  ): Promise<IIncomeDocument[]> => {
    input.userId = userId;
    console.log(input);

    return (await IncomeModel.find({ ...input }).lean()) as IIncomeDocument[];
  },
};

export default incomeService;
