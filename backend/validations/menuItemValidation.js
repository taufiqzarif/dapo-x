import Joi from 'joi';

const menuItemSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  menuCategory: Joi.string().required(),
  menuType: Joi.string().required(),
  availability: Joi.boolean().default(false),
  availableDate: Joi.date(),
  countInStock: Joi.number().required().default(0),
  imageURL: Joi.string().required(),
  isPreOrderOnly: Joi.boolean().default(false),
});

export default menuItemSchema;
