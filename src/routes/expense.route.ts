import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { expenseSchema, expenseQuery } from '../schemas/expense.schema';
import expressValidator from 'express-joi-validation';
import expenseController from '../controllers/expense.controller';
import { memoryLoader, diskLoader } from '../middleware/fileUpload';

const expenseRouter = Router();
const validator = expressValidator.createValidator({});

// expenseRouter.use(fileUpload())
expenseRouter.use(authMiddleware);
expenseRouter.post('/', validator.body(expenseSchema), expenseController.createExpense);
expenseRouter.post('/upload', diskLoader.single('file'), expenseController.expenseFromExcel);
expenseRouter.get('/', validator.body(expenseQuery), expenseController.getExpenses);

export default expenseRouter;
