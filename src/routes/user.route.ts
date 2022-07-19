import { Router } from 'express';
import expressValidator from 'express-joi-validation';
import { userSchema } from '../schemas/user.schema';
import userController from '../controllers/user.controller';
const userRouter = Router();
const validator = expressValidator.createValidator({});

userRouter.post('/', validator.body(userSchema), userController.createUser);

export default userRouter;
