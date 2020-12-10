const express = require('express');
const router = new express.Router();
const validateAsync = require('../validation/validate-async');
const employeeIdSchema = require('../validation/schemas/employee-id-schema');
const EmployeesController = require('../controllers/employees-controller');
const checkToken = require('../authentication/check-token');
const getEmployeesListQuerySchema = require('../validation/schemas/get-employees-list-query-schema');
const employeeSchema = require('../validation/schemas/employee-schema');

router.param('employeeId',
	async (req, res, next, employeeId) => validateAsync({employeeId}, employeeIdSchema, next));

router
	.route('/:employeeId')
	.get(EmployeesController.getByIdEmployee)
	.put(checkToken,
		async (req, res, next) => validateAsync(req.body, employeeSchema, next),
		EmployeesController.updateEmployee)
	.delete(checkToken,
		EmployeesController.deleteEmployee);

router
	.route('/')
	.get(async (req, res, next) => validateAsync(req.query, getEmployeesListQuerySchema, next),
		EmployeesController.getEmployeesList)
	.post(checkToken,
		async (req, res, next) => validateAsync(req.body, employeeSchema, next),
		EmployeesController.saveEmployee);

module.exports = router;
