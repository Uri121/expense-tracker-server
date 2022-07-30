import { IUserDocument } from './../models/user.model';
import { IExpenseDocument, ExpenseModel } from '../models/expense.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import excelToJson from 'convert-excel-to-json';
import fs from 'fs';
import { UserModel } from '../models/user.model';

/**
 * create an array of IExpenseDocument that will be saved in db
 *
 * @param expenses excelToJson sheet array
 * @param userId string that represents user id
 * @param userCards the cards the user added
 * @returns IExpenseDocument array
 */
const setDataToBeSavedInDb = (expenses: any[], userId: string, userCards: string[]): IExpenseDocument[] => {
  const filtered = expenses.filter((item) => userCards.find((card) => card === item.cardNumber));
  const expensesToSave = filtered.map((item) => {
    return {
      ...item,
      userId,
    };
  });
  return expensesToSave;
};

/**
 * convert excel to json
 *
 * @param path to the excel file location
 * @returns the json object
 */
const convertToJson = (path: string) => {
  return excelToJson({
    source: fs.readFileSync(path),
    header: {
      rows: 22,
    },
    columnToKey: {
      A: 'cardNumber',
      B: 'transactionDate',
      C: 'date',
      D: 'title',
      E: 'amount',
      F: 'transactionAmount',
      M: 'transactionDescription',
    },
  });
};

const expenseService = {
  /**
   * create new expense and save in db
   *
   * @param userId string represents the user id
   * @param input expense object
   * @returns the saved expense
   */
  createExpense: async (userId: string, input: DocumentDefinition<IExpenseDocument>): Promise<IExpenseDocument> => {
    try {
      input.userId = userId;
      return await ExpenseModel.create(input);
    } catch (error) {
      throw error;
    }
  },
  /**
   * finds an expense based on user query
   *
   * @param userId string represents the user id
   * @param input expense object props to query
   * @returns the result from the query
   */
  getExpenses: async (userId: string, input: FilterQuery<IExpenseDocument>): Promise<IExpenseDocument[]> => {
    try {
      input.userId = userId;
      return await ExpenseModel.find({ ...input }).lean();
    } catch (error) {
      throw error;
    }
  },
  /**
   * convert excel to json build an expense object and save in db
   *
   * @param userId string represents the user id
   * @param excel file
   * @returns the new expenses
   */
  expenseFromExcel: async (userId: string, excel: any): Promise<IExpenseDocument[]> => {
    try {
      const json = convertToJson(excel.path);
      const user = (await UserModel.findById(userId)) as IUserDocument;
      const userCards = user.userCards;
      if (!userCards) throw new Error('user should have at least one card');

      let expensesList: IExpenseDocument[] = [];

      for (const [key, sheet] of Object.entries(json)) {
        const expensesToSave = setDataToBeSavedInDb(sheet, userId, userCards);
        expensesList = expensesList.concat(expensesToSave);
      }

      const expenses = await ExpenseModel.insertMany(expensesList);
      fs.unlinkSync(excel.path);
      return expenses;
    } catch (error) {
      throw error;
    }
  },
};

export default expenseService;
