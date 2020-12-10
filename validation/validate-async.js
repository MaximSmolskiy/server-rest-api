const Boom = require('@hapi/boom');

async function validateAsync(value, schema, next) {
	try {
		await schema.validateAsync(value, {abortEarly: false, allowUnknown: true});
	} catch (err) {
		throw Boom.badRequest(err.toString());
	}

	next();
}

module.exports = validateAsync;
