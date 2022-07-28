import { IExpenseDocument, ExpenseModel } from '../models/expense.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import excelToJson from 'convert-excel-to-json';
import fs from 'fs';

const setDataToBeSavedInDb = (expenses: any[], userId: string): IExpenseDocument[] => {
  const filtered = expenses.filter((item) => item.cardNumber === '9362');
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
      const expensesToSave = setDataToBeSavedInDb(json.sheet1, userId);
      const expenses = await ExpenseModel.insertMany(expensesToSave);
      fs.unlinkSync(excel.path);
      return expenses;
    } catch (error) {
      throw error;
    }
  },
};

export default expenseService;
