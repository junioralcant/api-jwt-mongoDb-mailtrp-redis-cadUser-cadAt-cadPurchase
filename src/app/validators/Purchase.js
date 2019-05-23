const Joi = require('joi');

module.exports = {

    body: { //validaçaõ no body
        ad: Joi.string().required(), // se o campo title é uma strind e que required que esse campo é o brigatório
        content: Joi.string().required(),
    }
}