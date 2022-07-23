import mongoose from 'mongoose';

export interface IOthers {
  title: string;
  amount: number;
}

export interface IIncomeDocument extends mongoose.Document {
  salary: number;
  userId: string;
  date: Date;
  others?: IOthers[];
  createdAt: Date;
  updatedAt: Date;
}

const othersSchema = new mongoose.Schema({
  title: { type: String },
  amount: { type: Number },
});

const incomeSchema = new mongoose.Schema(
  {
    salary: { type: Number, require: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    date: { type: Date, require: true },
    others: [othersSchema],
  },
  { timestamps: true }
);

export const IncomeModel = mongoose.model<IIncomeDocument>('Income', incomeSchema);
