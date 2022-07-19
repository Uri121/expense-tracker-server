import Joi from 'joi';

export const userSchema = Joi.object({
  email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
  password: Joi.string().regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  ),
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
});
