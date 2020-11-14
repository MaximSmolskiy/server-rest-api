const Boom = require('@hapi/boom');
const db = require('./database');

class EmployeesService {
	async getEmployeesList() {
		return db.then(db => db.get('employees').value());
	}

	async saveEmployee(employee) {
		return db.then(db => db.get('employees').insert(employee).write());
	}

	async getByIdEmployee(employeeId) {
		const employee = await db.then(db => db.get('employees').getById(employeeId).value());

		if (!employee) {
			throw Boom.notFound();
		}

		return employee;
	}

	async deleteEmployee(employeeId) {
		const employee = await db.then(db => db.get('employees').removeById(employeeId).write());

		if (!employee) {
			throw Boom.notFound();
		}

		return employee;
	}
}

module.exports = new EmployeesService();
