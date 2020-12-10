const Joi = require('joi');

const configSchema = Joi.object({
	path: Joi
		.string()
		.uri({relativeOnly: true})
		.required(),
	hostname: Joi
		.string()
		.hostname()
		.required(),
	port: Joi
		.number()
		.port()
		.required()
});

module.exports = configSchema;
