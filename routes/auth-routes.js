const express = require('express');
const router = new express.Router();
const validateAsync = require('../validation/validate-async');
const authSchema = require('../validation/schemas/auth-schema');
const AuthController = require('../controllers/auth-controller');

router
	.route('/')
	.post(async (req, res, next) => validateAsync(req.body, authSchema, next),
		AuthController.createToken);

module.exports = router;
