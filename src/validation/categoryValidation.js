import Joi from "joi";

export const categoryValidation = Joi.object({
  name: Joi.string().required().min(3).max(255).messages({
    "string.base": "Title must be a string",
    "string.empty": "Title must be empty",
    "string.min": "Title must have at least one character 3",
    "string.max": "Title must have at most one character max 255",
  }),
  slug: Joi.string().optional(),
  status: Joi.boolean(),
});
