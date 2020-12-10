const Boom = require('@hapi/boom');

async function validateAsync(value, schema, next) {
	let result;
	try {
		result = await schema.validateAsync(value, {abortEarly: false, allowUnknown: true});
	} catch (err) {
		throw Boom.badRequest(err.toString());
	}

	if (next) {
		next();
	} else {
		return result;
	}
}

module.exports = validateAsync;
