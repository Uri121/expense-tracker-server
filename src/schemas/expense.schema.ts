import Joi from 'joi';

export const expenseSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  date: Joi.date().required(),
});
