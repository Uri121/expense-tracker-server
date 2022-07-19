import { IUserDocument, UserModel } from '../models/user.model';
import { DocumentDefinition } from 'mongoose';
import { omit } from 'lodash';

const userService = {
  createUser: async (
    input: DocumentDefinition<
      Omit<IUserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
    >
  ): Promise<Partial<IUserDocument>> => {
    try {
      const user = await UserModel.create(input);
      return omit(user.toJSON(), 'password');
    } catch (error) {
      throw error;
    }
  },
};
export default userService;
