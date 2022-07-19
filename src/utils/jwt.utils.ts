import jwt, { JwtPayload } from 'jsonwebtoken';

const privateKey = process.env.PRIVATE_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;

export const signJwt = (
  object: Object,
  options: jwt.SignOptions | undefined
) => {
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
    const decoded = jwt.verify(token, publicKey);
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
