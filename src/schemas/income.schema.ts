import Joi from 'joi';

export const incomeSchema = Joi.object({
  salary: Joi.number().required(),
  date: Joi.date().required(),
  others: Joi.object().keys({
    title: Joi.string(),
    amount: Joi.number(),
  }),
});

export const incomeQuery = Joi.object({
  salary: Joi.number(),
  date: Joi.date(),
});
