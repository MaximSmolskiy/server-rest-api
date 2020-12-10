const StatusCodes = require('http-status-codes');
const EmployeesService = require('../services/employees-service');

class EmployeesController {
	async getEmployeesList(req, res) {
		const query = req.query;
		res
			.status(StatusCodes.OK)
			.json(await EmployeesService.getEmployeesList(
				{name: query.name, surname: query.surname},
				query.sort,
				query.page));
	}

	async saveEmployee(req, res) {
		res
			.status(StatusCodes.OK)
			.json(await EmployeesService.saveEmployee(req.body));
	}

	async getByIdEmployee(req, res) {
		res
			.status(StatusCodes.OK)
			.json(await EmployeesService.getByIdEmployee(req.params.employeeId));
	}

	async updateEmployee(req, res) {
		res
			.status(StatusCodes.OK)
			.json(await EmployeesService.updateEmployee(req.params.employeeId, req.body));
	}

	async deleteEmployee(req, res) {
		res
			.status(StatusCodes.OK)
			.json(await EmployeesService.deleteEmployee(req.params.employeeId));
	}
}

module.exports = new EmployeesController();
