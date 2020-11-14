const express = require('express');
require('express-async-errors');
const app = express();
const {path, hostname, port} = require('./config');
const routes = require('./routes');
const StatusCodes = require('http-status-codes');

app.use(express.json());
app.use(path, routes);

app.use(async (err, req, res, next) => {
	if (err.isBoom) {
		const payload = err.output.payload;
		res.status(payload.statusCode).json({message: payload.message});
	} else if (err.isJoi) {
		res.status(StatusCodes.BAD_REQUEST).json({message: err.toString()});
	} else if (err.error && err.error.isJoi) {
		res.status(StatusCodes.BAD_REQUEST).json({message: err.error.toString()});
	} else {
		next(err);
	}
});

app.listen(port, hostname, () => console.log(`Server REST API listening at http://${hostname}:${port}`));
