import { IUserDocument } from './../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../config/default.config';
const { privateKey, pubKey } = config;

export const signJwt = (object: Object, options: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export interface IJwtValidation {
  decoded: IUserDocument | null;
  expired: boolean;
}

export const validateJwt = (token: string): IJwtValidation => {
  try {
    const decoded = jwt.verify(token, pubKey) as IUserDocument;

    return {
      decoded,
      expired: false,
    };
  } catch (error) {
    return {
      decoded: null,
      expired: true,
    };
  }
};
