import { getUserId } from './../utils/currentUser.utils';
import successResponse from '../responseHandlers/successResponse';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../middleware/logger';

const userController = {
  /**
   * triggers the user service create user function
   *
   * @param req express Request object
   * @param res express Response object
   * @param next express Next function
   * @returns a success response if no errors
   */
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser = await userService.createUser(req.body);
      logger.info('user created successfully', createdUser);
      return successResponse(res, 'user created successfully', createdUser);
    } catch (error: unknown) {
      next(error);
    }
  },
  /**
   * triggers the user service sign user function
   *
   * @param req express Request object
   * @param res express Response object
   * @param next express Next function
   * @returns a success response if no errors
   */
  signUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken } = await userService.signUser(req.body);
      logger.info('token has been issued successfully');
      res.cookie('accessToken', accessToken, { maxAge: 9000, httpOnly: true, secure: true });
      res.cookie('refreshToken', refreshToken, { maxAge: 9000, httpOnly: true, secure: true });
      successResponse(res, 'token has been issued successfully', { accessToken, refreshToken });
    } catch (error: unknown) {
      next(error);
    }
  },
  /**
   * log the user out of the system
   *
   * @param req express Request object
   * @param res express Response object
   * @param next express Next function
   * @returns a success response if no errors
   */
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.currentUser = null;
      res.clearCookie('token');
      successResponse(res, 'user has logged out', {});
    } catch (error: unknown) {
      next(error);
    }
  },
  /**
   * triggers the user service get user function
   *
   * @param req express Request object
   * @param res express Response object
   * @param next express Next function
   * @returns a success response if no errors
   */
  getUserByEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getUserByEmail(req.query);
      logger.info('user was found', user);
      successResponse(res, 'user was found', user);
    } catch (error: unknown) {
      next(error);
    }
  },
  /**
   * triggers the user service add user cards function
   *
   * @param req express Request object
   * @param res express Response object
   * @param next express Next function
   * @returns a success response if no errors
   */
  addUserCards: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getUserId(req);
      const { cards } = req.body;
      const resp = await userService.addUserCards(userId, cards);
      logger.info('cards has been added successfully', resp.toJSON());
      successResponse(res, 'cards has been added successfully', resp);
    } catch (error: unknown) {
      next(error);
    }
  },
  /**
   * triggers the user service get balance function
   *
   * @param req express Request object
   * @param res express Response object
   * @param next express Next function
   * @returns a success response if no errors
   */
  getBalanceByRange: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getUserId(req);
      const start = req.query.start as string;
      const end = req.query.end as string;

      const balance = await userService.getBalanceByRange(userId, { start, end });
      logger.info('your balance is', balance);
      successResponse(res, 'your balance is', balance);
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default userController;
