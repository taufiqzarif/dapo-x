import Joi from 'joi';

const promoCodeSchema = Joi.object({
  code: Joi.string().required(),
  discount: Joi.number().required(),
  validFrom: Joi.date().required(),
  validUntil: Joi.date(),
  usageLimit: Joi.number().required(),
  newUsersOnly: Joi.boolean().default(false),
  active: Joi.boolean().required().default(false),
});

export default promoCodeSchema;
