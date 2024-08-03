import Joi from "joi";

export const signUpValidation = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(255),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .max(255)
    .valid(Joi.ref("password")),
  status: Joi.boolean(),
  role: Joi.string().valid("admin", "member"),
});

export const signInValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

export const forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
});
