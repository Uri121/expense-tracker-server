import { ISignUser, IUserDocument, UserModel } from '../models/user.model';
import { DocumentDefinition } from 'mongoose';
import { omit } from 'lodash';
import { signJwt } from '../utils/jwt.utils';
import config from '../config/default.config';

const { tokenTTL } = config;

const userService = {
  createUser: async (
    input: DocumentDefinition<Omit<IUserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>
  ): Promise<Partial<IUserDocument>> => {
    try {
      const user = await UserModel.create(input);
      return omit(user.toJSON(), 'password');
    } catch (error) {
      throw error;
    }
  },
  signUser: async (input: ISignUser): Promise<string> => {
    try {
      const user = await UserModel.findOne({ email: input.email });
      if (!user) throw new Error('something went wrong');
      const isValid = user.comparePassword(input.password);
      if (!isValid) throw new Error('email or password are wrong');

      const token = signJwt(omit(user.toJSON(), 'password'), { expiresIn: tokenTTL });
      return token;
    } catch (error) {
      throw error;
    }
  },
};
export default userService;
