const schema = require('./schema');
const config = require('config');

const {value, error} = schema.validate(config, {abortEarly: false});

if (error) {
	throw error.toString();
}

module.exports = value;
