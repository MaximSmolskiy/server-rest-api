const db = require('./database');

class EmployeesService {
	async getEmployeesList() {
		const employeesList = await db.then(db => {
			return db.get('employees').value();
		});
		return employeesList;
	}

	async saveEmployee(employee) {
		const newEmployee = await db.then(db => {
			return db.get('employees').insert(employee).write();
		});
		return newEmployee.id;
	}

	async getEmployeeProfile(employeeId) {
		const employee = await db.then(db => {
			return db.get('employees').getById(employeeId).value();
		});
		return employee;
	}

	async deleteEmployee(employeeId) {
		const employee = await db.then(db => {
			return db.get('employees').removeById(employeeId).write();
		});
		return employee;
	}
}

module.exports = new EmployeesService();
