import mongoose from 'mongoose';

export interface IExpenseDocument extends mongoose.Document {
  title: string;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    amount: { type: Number, require: true },
    date: { type: Date, require: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export const ExpenseModel = mongoose.model<IExpenseDocument>('Expense', expenseSchema);
