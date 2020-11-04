const schema = require('./config/schema');
const config = require('config');
const express = require('express');
const app = express();
const routes = require('./routes');
const HttpStatusCodes = require('http-status-codes');

const {value, error} = schema.validate(config, {abortEarly: false});

if (error) {
	throw new TypeError(error);
}

app.use(express.json());
app.use(value.path, routes);

app.use(async (error, request, response, next) => {
	if (error && error.error && error.error.isJoi) {
		response.status(HttpStatusCodes.BAD_REQUEST).json({message: error.error.toString()});
	} else if (error && error.isJoi) {
		response.status(HttpStatusCodes.BAD_REQUEST).json({message: error.toString()});
	} else {
		next(error);
	}
});

app.listen(value.port, value.hostname, () => {
	console.log(`Server REST API listening at http://${value.hostname}:${value.port}`);
});
