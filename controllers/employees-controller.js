const EmployeesService = require('../services/employees-service');
const {ReasonPhrases, StatusCodes} = require('http-status-codes');

class EmployeesController {
	async getEmployeesList(request, response) {
		const employeesList = await EmployeesService.getEmployeesList();
		response.status(StatusCodes.OK).json(employeesList);
	}

	async saveEmployee(request, response) {
		const employeeId = await EmployeesService.saveEmployee(request.body);
		response.status(StatusCodes.CREATED).location(request.baseUrl + '/' + employeeId).json({message: ReasonPhrases.CREATED});
	}

	async getEmployeeProfile(request, response) {
		const employee = await EmployeesService.getEmployeeProfile(request.employeeId);

		if (employee) {
			response.status(StatusCodes.OK).json(employee);
		} else {
			response.status(StatusCodes.NOT_FOUND).json({message: ReasonPhrases.NOT_FOUND});
		}
	}

	async deleteEmployee(request, response) {
		const employee = await EmployeesService.deleteEmployee(request.employeeId);

		if (employee) {
			response.sendStatus(StatusCodes.NO_CONTENT);
		} else {
			response.status(StatusCodes.NOT_FOUND).json({message: ReasonPhrases.NOT_FOUND});
		}
	}
}

module.exports = new EmployeesController();
