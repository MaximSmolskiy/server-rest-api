const EmployeesService = require('../services/employees-service');
const StatusCodes = require('http-status-codes');

class EmployeesController {
	async getEmployeesList(req, res) {
		res.status(StatusCodes.OK).json(await EmployeesService.getEmployeesList());
	}

	async saveEmployee(req, res) {
		res.status(StatusCodes.OK).json(await EmployeesService.saveEmployee(req.body));
	}

	async getByIdEmployee(req, res) {
		res.status(StatusCodes.OK).json(await EmployeesService.getByIdEmployee(req.employeeId));
	}

	async deleteEmployee(req, res) {
		res.status(StatusCodes.OK).json(await EmployeesService.deleteEmployee(req.employeeId));
	}
}

module.exports = new EmployeesController();
