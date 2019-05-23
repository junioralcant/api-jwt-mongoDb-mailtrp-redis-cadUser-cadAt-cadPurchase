const Joi = require('joi');

module.exports = {

    body: { //validaçaõ no body
        title: Joi.string().required(), // se o campo title é uma strind e que required que esse campo é o brigatório
        description: Joi.string().required(),
        price: Joi.number().required()
    }
}