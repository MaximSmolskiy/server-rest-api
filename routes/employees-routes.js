const Joi = require('joi');
const express = require('express');
const router = new express.Router();
const EmployeesController = require('../controllers/employees-controller');
const expressJoiValidation = require('express-joi-validation');
const validator = expressJoiValidation.createValidator({passError: true});
const employeeSchema = require('./employee-schema');

const employeeIdSchema = Joi.object({
	employeeId: Joi.string().guid().required()
});

router.param('employeeId', async (request, response, next, employeeId) => {
	try {
		const value = await employeeIdSchema.validateAsync({employeeId}, {abortEarly: false});
		request.employeeId = value.employeeId;
		next();
	} catch (error) {
		next(error);
	}
});

router
	.route('/:employeeId')
	.get(EmployeesController.getEmployeeProfile)
	.delete(EmployeesController.deleteEmployee);

router
	.route('/')
	.get(EmployeesController.getEmployeesList)
	.post(validator.body(employeeSchema), EmployeesController.saveEmployee);

module.exports = router;
