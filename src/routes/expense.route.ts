import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { expenseSchema } from '../schemas/expense.schema';
import expressValidator from 'express-joi-validation';
import expenseController from '../controllers/expense.controller';

const expenseRouter = Router();
const validator = expressValidator.createValidator({});

expenseRouter.use(authMiddleware);
expenseRouter.post('/', validator.body(expenseSchema), expenseController.createExpense);

export default expenseRouter;
