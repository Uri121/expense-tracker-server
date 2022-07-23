import { authMiddleware } from './../middleware/auth';
import { incomeSchema, incomeQuery } from './../schemas/income.schema';
import { Router } from 'express';
import expressValidator from 'express-joi-validation';
import incomeController from '../controllers/income.controller';

const incomeRouter = Router();
const validator = expressValidator.createValidator({});

incomeRouter.use(authMiddleware);
incomeRouter.post('/', validator.body(incomeSchema), incomeController.addIncome);
incomeRouter.get('/', validator.query(incomeQuery), incomeController.getIncome);

export default incomeRouter;
