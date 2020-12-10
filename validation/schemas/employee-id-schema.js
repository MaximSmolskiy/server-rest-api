const Joi = require('joi');

const employeeIdSchema = Joi.object({
	employeeId: Joi
		.string()
		.guid()
});

module.exports = employeeIdSchema;
