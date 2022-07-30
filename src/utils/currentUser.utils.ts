import { Request } from 'express';

export const getUserId = (req: Request): string => {
  if (!req.currentUser?._id) {
    throw new Error('user id was not found');
  }
  return req.currentUser._id;
};
