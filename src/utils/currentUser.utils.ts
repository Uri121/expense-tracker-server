import { Request } from 'express';

export const getUserId = (req: Request): string => {
  if (!req.currentUser?._id) {
    throw new Error('something went wrong');
  }
  return req.currentUser._id;
};
