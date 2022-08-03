import { ExpenseModel } from './../models/expense.model';
import { IBalanceRange } from './../models/user.model';
import { ISignUser, IUserDocument, UserModel, IAuth } from '../models/user.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import { omit } from 'lodash';
import { signJwt, validateJwt } from '../utils/jwt.utils';
import mongoose from 'mongoose';
import config from '../config/default.config';

const { tokenTTL, refreshTTL } = config;

const userService = {
  /**
   * create a new user and save in the db
   *
   * @param input user model schema
   * @returns the new user
   */
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
  /**
   * sign a user into the system and issue jwt token
   *
   * @param input email and password
   * @returns accessToken and refreshToken
   */
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
  /**
   * issue a new accessToken if the refreshToken is valid
   *
   * @param refreshToken jwt token
   * @returns a new accessToken
   */
  reIssueAccessToken: async (refreshToken: string) => {
    const { decoded } = validateJwt(refreshToken);
    if (!decoded) return false;
    const user = await UserModel.findById(decoded._id);
    if (!user) return false;

    const accessToken = signJwt(omit(user.toJSON(), 'password'), { expiresIn: tokenTTL });
    return accessToken;
  },
  /**
   * get user by the unique field email
   *
   * @param input user email
   * @returns a user model
   */
  getUserByEmail: async (input: FilterQuery<IUserDocument>): Promise<IUserDocument> => {
    try {
      return (await UserModel.findOne({ input }).lean().select('-password')) as IUserDocument;
    } catch (error) {
      throw error;
    }
  },
  /**
   *  the function add the last 4 digits of the user cards
   *
   * todo need to check if the cards already exist
   *
   * @param userId to find the correct user
   * @param input array or card numbers
   * @returns the updated user model
   */
  addUserCards: async (userId: string, input: string[]): Promise<IUserDocument> => {
    try {
      return (await UserModel.findByIdAndUpdate(userId, { $set: { userCards: input } })) as IUserDocument;
    } catch (error) {
      throw error;
    }
  },
  /**
   * calc the balance for a range of dates
   *
   * @param userId string represents the user id
   * @param query the date range to calc the balance
   * @returns the total expense income and balance
   */
  getBalanceByRange: async (userId: string, { start, end }: IBalanceRange) => {
    try {
      const query = [
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            date: {
              $gte: new Date(start),
              $lte: new Date(end),
            },
          },
        },
        {
          $group: {
            _id: '$userId',
            expenseAmount: {
              $sum: '$amount',
            },
          },
        },
        {
          $lookup: {
            from: 'incomes',
            localField: '_id',
            foreignField: 'userId',
            as: 'incomes',
          },
        },
        {
          $project: {
            expense: '$expenseAmount',
            income: {
              $sum: '$incomes.salary',
            },
            total: {
              $subtract: [
                {
                  $sum: '$incomes.salary',
                },
                '$expenseAmount',
              ],
            },
          },
        },
      ];
      const rsp = await ExpenseModel.aggregate(query);

      return rsp[0];
    } catch (error) {
      throw error;
    }
  },
};
export default userService;
