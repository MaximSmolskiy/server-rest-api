function validate(value, schema) {
	return schema.validate(value, {abortEarly: false, allowUnknown: true});
}

module.exports = validate;
