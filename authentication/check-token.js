const validate = require('../validation/validate');
const tokenSchema = require('../validation/schemas/token-schema');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {secret} = require('../configuration/secret.json');

async function checkToken(req, res, next) {
	const {value, error} = validate(req.headers, tokenSchema);

	if (error) {
		throw Boom.badRequest(error.toString());
	}

	const token = value.authorization;

	jwt.verify(token, secret, err => {
		if (err) {
			throw Boom.unauthorized(err.toString());
		}

		next();
	});
}

module.exports = checkToken;
