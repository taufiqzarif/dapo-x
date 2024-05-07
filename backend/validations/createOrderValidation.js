import Joi from 'joi';

const createOrderSchema = Joi.object({
  orderItems: Joi.array().items(
    Joi.object({
      item: Joi.string().required(),
      quantity: Joi.number().required(),
    })
  ),
  paymentMethod: Joi.string().required(),
  deliveryAddressIndex: Joi.number().required(),
});

export default createOrderSchema;
