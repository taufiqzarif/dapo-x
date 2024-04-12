import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  role: Joi.string().valid('user', 'admin', 'rider').default('user'),
  addresses: Joi.array()
    .items(
      Joi.object({
        addressName: Joi.string(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string().required(),
      })
    )
    .min(1),
  defaultAddressIndex: Joi.number().integer().min(0).required(),
});

export { registerSchema };
