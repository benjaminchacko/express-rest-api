 let Joi = require("joi");

 const signUpValidation = Joi.object({
    name: Joi.string()
      .min(2)
      .regex(/^[a-zA-Z]+$/),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

module.exports = signUpValidation;
 
