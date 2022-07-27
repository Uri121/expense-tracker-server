import mongoose from 'mongoose';

export interface IExpenseDocument extends mongoose.Document {
  cardNumber: string;
  title: string;
  amount: number;
  transactionAmount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  transactionDescription?: string;
  date: Date;
  transactionDate: Date;
}

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    cardNumber: { type: String, require: true },
    amount: { type: Number, require: true },
    transactionAmount: { type: Number, require: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    transactionDescription: { type: String },
    date: { type: Date, require: true },
    transactionDate: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);

export const ExpenseModel = mongoose.model<IExpenseDocument>('Expense', expenseSchema);
