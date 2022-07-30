import { IUserDocument } from './../models/user.model';
import { IExpenseDocument, ExpenseModel } from '../models/expense.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import excelToJson from 'convert-excel-to-json';
import fs from 'fs';
import { UserModel } from '../models/user.model';

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
  createExpense: async (userId: string, input: DocumentDefinition<IExpenseDocument>): Promise<IExpenseDocument> => {
    try {
      input.userId = userId;
      return await ExpenseModel.create(input);
    } catch (error) {
      throw error;
    }
  },
  getExpenses: async (userId: string, input: FilterQuery<IExpenseDocument>): Promise<IExpenseDocument[]> => {
    try {
      input.userId = userId;
      return await ExpenseModel.find({ ...input }).lean();
    } catch (error) {
      throw error;
    }
  },
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
      console.log('expensesList', expensesList);

      // const expenses = await ExpenseModel.insertMany(expensesList);
      fs.unlinkSync(excel.path);
      // return expenses;
      return [];
    } catch (error) {
      throw error;
    }
  },
};

export default expenseService;
