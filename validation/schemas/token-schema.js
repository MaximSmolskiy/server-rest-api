const Joi = require('joi');

const tokenSchema = Joi.object({
	authorization: Joi
		.string()
		.replace(/^Bearer\s/, '')
		.pattern(/^\S+$/)
		.required()
});

module.exports = tokenSchema;
