function validate(value, schema) {
	const result = schema.validate(value, {abortEarly: false});

	if (result.error) {
		throw new TypeError(result.error);
	}

	return result.value;
}

module.exports = validate;
