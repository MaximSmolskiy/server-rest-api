const BaseJoi = require('joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);

const employeeSchema = Joi.object({
	name: Joi
		.string()
		.max(100)
		.required(),
	surname: Joi
		.string()
		.max(100)
		.required(),
	date: Joi
		.date()
		.format('DD.MM.YYYY')
		.required(),
	position: Joi
		.string()
		.valid(
			'Junior Software Engineer',
			'Software Engineer',
			'Senior Software Engineer',
			'Lead Software Engineer'),
	salary: Joi
		.number()
		.required()
});

module.exports = employeeSchema;
