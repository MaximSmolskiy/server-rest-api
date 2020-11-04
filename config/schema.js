const Joi = require('joi');

const schema = Joi.object({
	path: Joi.string()
		.uri({relativeOnly: true})
		.required(),
	hostname: Joi.string()
		.hostname()
		.required(),
	port: Joi.number()
		.port()
		.required()
});

module.exports = schema;
