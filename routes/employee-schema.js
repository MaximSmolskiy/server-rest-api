const Joi = require('joi');

const employeeSchema = Joi.object({
	name: Joi.string()
		.max(100)
		.required(),
	surname: Joi.string()
		.max(100)
		.required(),
	date: Joi.date()
		.raw()
		.required(),
	position: Joi.string()
		.valid(
			'Junior Software Engineer',
			'Software Engineer',
			'Senior Software Engineer',
			'Lead Software Engineer'
		),
	salary: Joi.number()
		.required()
});

module.exports = employeeSchema;
