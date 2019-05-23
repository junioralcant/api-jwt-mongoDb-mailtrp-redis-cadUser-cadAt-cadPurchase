const Joi = require('joi');

module.exports = {

    body: { //validaçaõ no body
        name: Joi.string().required(),
        email: Joi.string().email().required(), // se o campo é uma string e que required que esse campo é o brigatório
        password: Joi.string().required().min(6), // min(6) tem que ter no minimo 6 caracteres
    }   
}