const db = require('./database');
const {sortField, pageSize} = require('../configuration/constants.json');
const Boom = require('@hapi/boom');

class EmployeesService {
	async getEmployeesList(filters, sortOrder, page) {
		return db.then(db => db
			.get('employees')
			.filter(employee => {
				const isEqual = (filter, employee) => !filter || filter.toLowerCase() === employee.toLowerCase();
				return isEqual(filters.name, employee.name) && isEqual(filters.surname, employee.surname);
			})
			.orderBy(sortField, sortOrder)
			.drop((page - 1) * pageSize)
			.take(pageSize)
			.value());
	}

	async saveEmployee(employee) {
		return db.then(db => db
			.get('employees')
			.insert(employee)
			.write());
	}

	async getByIdEmployee(employeeId) {
		const employee = await db.then(db => db
			.get('employees')
			.getById(employeeId)
			.value());

		if (!employee) {
			throw Boom.notFound();
		}

		return employee;
	}

	async updateEmployee(employeeId, employeeData) {
		const employee = await db.then(db => db
			.get('employees')
			.getById(employeeId)
			.assign(employeeData)
			.write());

		if (!employee.id) {
			throw Boom.notFound();
		}

		return employee;
	}

	async deleteEmployee(employeeId) {
		const employee = await db.then(db => db
			.get('employees')
			.removeById(employeeId)
			.write());

		if (!employee) {
			throw Boom.notFound();
		}

		return employee;
	}
}

module.exports = new EmployeesService();
