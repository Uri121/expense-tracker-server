import mongoose from 'mongoose';

export interface IUserSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUserSchema>('User', userSchema);
