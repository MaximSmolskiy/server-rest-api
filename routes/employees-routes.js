const express = require('express');
const router = new express.Router();
const EmployeesController = require('../controllers/employees-controller');
const expressJoiValidation = require('express-joi-validation');
const validator = expressJoiValidation.createValidator({passError: true});
const {employeeIdSchema, employeeSchema} = require('./employee-schemas');

router.param('employeeId', async (req, res, next, employeeId) => {
	const value = await employeeIdSchema.validateAsync({employeeId});
	req.employeeId = value.employeeId;
	next();
});

router
	.route('/:employeeId')
	.get(EmployeesController.getByIdEmployee)
	.delete(EmployeesController.deleteEmployee);

router
	.route('/')
	.get(EmployeesController.getEmployeesList)
	.post(validator.body(employeeSchema), EmployeesController.saveEmployee);

module.exports = router;
