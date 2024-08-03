import Joi from "joi";

export const productValidation = Joi.object({
  category_id: Joi.string().required(),
  brand_id: Joi.string().required(),
  name: Joi.string().required(),
  sku: Joi.string().required(),
  slug: Joi.string(),
  price: Joi.number().required(),
  discount: Joi.number(),
  thumbnail: Joi.string().required(),
  images: Joi.array(),
  description: Joi.string(),
  content: Joi.string(),
  status: Joi.boolean().required(),
});
