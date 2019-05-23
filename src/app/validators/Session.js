const Joi = require('joi');

module.exports = {

    body: { //validaçaõ no body
        email: Joi.string().email().required(), // se o campo é uma string, se tem um formato de email e que esse campo é o brigatório
        password: Joi.string().required(),
    }   
}