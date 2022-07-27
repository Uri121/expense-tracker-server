import Joi from 'joi';

export const expenseSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  date: Joi.date().required(),
  cardNumber: Joi.string().required(),
  transactionAmount: Joi.string().required(),
  transactionDescription: Joi.string(),
});

export const expenseQuery = Joi.object({
  title: Joi.string(),
  amount: Joi.number(),
  date: Joi.date,
});
