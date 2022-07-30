import { IIncomeDocument, IncomeModel } from './../models/income.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';

const incomeService = {
  /**
   * create new income and save in db
   *
   * @param userId string represents the user id
   * @param input income object
   * @returns the new income object
   */
  addIncome: async (userId: string, input: DocumentDefinition<Partial<IIncomeDocument>>): Promise<IIncomeDocument> => {
    try {
      input.userId = userId;

      return await IncomeModel.create(input);
    } catch (error: unknown) {
      throw error;
    }
  },
  /**
   * finds an income based on the user query
   *
   * @param userId string represents the user id
   * @param input income object
   * @returns the result of the query
   */
  getIncome: async (userId: string, input: FilterQuery<IIncomeDocument>): Promise<IIncomeDocument[]> => {
    input.userId = userId;
    console.log(input);

    return (await IncomeModel.find({ ...input }).lean()) as IIncomeDocument[];
  },
};

export default incomeService;
