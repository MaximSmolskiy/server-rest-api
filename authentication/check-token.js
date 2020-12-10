const validateAsync = require('../validation/validate-async');
const tokenSchema = require('../validation/schemas/token-schema');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {secret} = require('../configuration/secret.json');

async function checkToken(req, res, next) {
	let token;
	try {
		token = (await validateAsync(req.headers, tokenSchema)).authorization;
	} catch (err) {
		throw Boom.badRequest(err.toString());
	}

	jwt.verify(token, secret, err => {
		if (err) {
			throw Boom.unauthorized(err.toString());
		}

		next();
	});
}

module.exports = checkToken;
