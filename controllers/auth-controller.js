const StatusCodes = require('http-status-codes');
const AuthService = require('../services/auth-service');

class AuthController {
	async createToken(req, res) {
		res
			.status(StatusCodes.OK)
			.json(await AuthService.createToken(req.body.username, req.body.password));
	}
}

module.exports = new AuthController();
