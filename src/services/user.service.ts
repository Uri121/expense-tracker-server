import { ISignUser, IUserDocument, UserModel, IAuth } from '../models/user.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import { omit } from 'lodash';
import { signJwt, validateJwt } from '../utils/jwt.utils';
import config from '../config/default.config';

const { tokenTTL, refreshTTL } = config;

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
  signUser: async (input: ISignUser): Promise<IAuth> => {
    try {
      const user = await UserModel.findOne({ email: input.email });
      if (!user) throw new Error('something went wrong');
      const isValid = user.comparePassword(input.password);
      if (!isValid) throw new Error('email or password are wrong');

      const accessToken = signJwt(omit(user.toJSON(), 'password'), { expiresIn: tokenTTL });
      const refreshToken = signJwt(omit(user.toJSON(), 'password'), { expiresIn: refreshTTL });
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  },
  reIssueAccessToken: async (refreshToken: string) => {
    const { decoded } = validateJwt(refreshToken);
    if (!decoded) return false;
    const user = await UserModel.findById(decoded._id);
    if (!user) return false;

    const accessToken = signJwt(omit(user.toJSON(), 'password'), { expiresIn: tokenTTL });
    return accessToken;
  },
  getUserByEmail: async (input: FilterQuery<IUserDocument>): Promise<IUserDocument> => {
    try {
      return (await UserModel.findOne({ input }).lean().select('-password')) as IUserDocument;
    } catch (error) {
      throw error;
    }
  },
};
export default userService;
