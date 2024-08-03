import Joi from "joi";

export const brandValidation = Joi.object({
  name: Joi.string().required(),
  thumbnail: Joi.string(),
  status: Joi.boolean().required(),
});
