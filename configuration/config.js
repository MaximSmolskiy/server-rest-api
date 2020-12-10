const validate = require('../validation/validate');
const config = require('./config.json');
const configSchema = require('../validation/schemas/config-schema');

module.exports = validate(config, configSchema);
