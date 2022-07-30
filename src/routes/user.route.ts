import { authMiddleware } from './../middleware/auth';
import { Router } from 'express';
import expressValidator from 'express-joi-validation';
import { signSchema, userQuery, userSchema, addCardSchema } from '../schemas/user.schema';
import userController from '../controllers/user.controller';
const userRouter = Router();
const validator = expressValidator.createValidator({});

userRouter.get('/', validator.query(userQuery), userController.getUserByEmail);
userRouter.post('/', validator.body(userSchema), userController.createUser);
userRouter.post('/sign', validator.body(signSchema), userController.signUser);
userRouter.post('/addCards', authMiddleware, validator.body(addCardSchema), userController.addUserCards);
userRouter.get('/logout', userController.logout);

export default userRouter;
