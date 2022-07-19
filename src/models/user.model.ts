import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
export interface IUserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: () => boolean;
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

userSchema.pre('save', async function (next: any) {
  let user = this as IUserDocument;
  const saltWorker = process.env.SALT as string;
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(Number(saltWorker));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePass: string
): Promise<boolean> {
  const user = this as IUserDocument;
  return bcrypt
    .compare(candidatePass, user.password)
    .catch((error: unknown) => false);
};

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
