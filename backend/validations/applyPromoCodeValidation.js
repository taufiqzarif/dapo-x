import Joi from 'joi';

const applyPromoCodeSchema = Joi.object({
  code: Joi.string().required(),
});

export default applyPromoCodeSchema;
