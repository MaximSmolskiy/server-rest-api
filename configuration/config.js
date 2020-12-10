const validate = require('../validation/validate');
const config = require('./config.json');
const configSchema = require('../validation/schemas/config-schema');

const {value, error} = validate(config, configSchema);

if (error) {
	throw new TypeError(error.toString());
}

module.exports = value;
