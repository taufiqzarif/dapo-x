import Joi from 'joi';

const registerLocalRiderValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  authMethods: Joi.array().items(
    Joi.object({
      provider: Joi.string().valid('local').required(),
      password: Joi.string().min(8).required(),
    })
  ),
  city: Joi.string().required(),
  icCardImage: Joi.string().required(),
  selfieImage: Joi.string().required(),
});

const registerGoogleRiderValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  authMethods: Joi.array().items(
    Joi.object({
      provider: Joi.string().valid('google').required(),
      providerId: Joi.string().required(),
    })
  ),
  city: Joi.string().required(),
  icCardImage: Joi.string().required(),
  selfieImage: Joi.string().required(),
});

export { registerLocalRiderValidation, registerGoogleRiderValidation };
