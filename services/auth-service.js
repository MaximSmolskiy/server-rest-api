const db = require('./database');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {secret} = require('../configuration/secret.json');
const {expiresIn} = require('../configuration/constants.json');

class AuthService {
	async createToken(username, password) {
		const user = await db.then(db => db
			.get('users')
			.find({username})
			.value());

		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw Boom.unauthorized('Bad username/password combination');
		}

		const token = jwt.sign({id: user.id}, secret, {expiresIn});
		return {id: user.id, token};
	}
}

module.exports = new AuthService();
