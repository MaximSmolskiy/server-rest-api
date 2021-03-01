const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const {path, hostname, port} = require('./configuration/config');
const routes = require('./routes');
const Boom = require('@hapi/boom');

app.use(cors());
app.use(express.json());
app.use(path, routes);

app.use(async (err, req, res, next) => {
	if (Boom.isBoom(err)) {
		const payload = err.output.payload;
		res
			.status(payload.statusCode)
			.json({message: payload.message});
	} else {
		next(err);
	}
});

app.listen(port, hostname, () => console.log(`Server REST API listening at http://${hostname}:${port}`));
