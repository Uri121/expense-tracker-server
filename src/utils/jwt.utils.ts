import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/default.config';
const { privateKey, pubKey } = config;

export const signJwt = (object: Object, options: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export interface IJwtValidation {
  decoded: string | JwtPayload | null;
  expired: boolean;
  error: unknown | null;
}

export const validateJwt = (token: string): IJwtValidation => {
  try {
    const decoded = jwt.verify(token, pubKey);
    return {
      decoded,
      expired: false,
      error: null,
    };
  } catch (error) {
    return {
      decoded: null,
      expired: true,
      error,
    };
  }
};
