const Joi = require('joi');

const getEmployeesListQuerySchema = Joi.object({
	name: Joi.string(),
	surname: Joi.string(),
	sort: Joi
		.string()
		.valid('asc', 'desc')
		.default('asc'),
	page: Joi
		.number()
		.integer()
		.positive()
		.default(1)
});

module.exports = getEmployeesListQuerySchema;
