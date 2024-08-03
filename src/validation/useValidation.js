import Joi from "joi";

export const userValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(255),
  status: Joi.boolean().required(),
  role: Joi.string().valid("admin", "member"),
});
