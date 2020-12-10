const express = require('express');
const router = new express.Router();
const authRoutes = require('./auth-routes');
const employeesRoutes = require('./employees-routes');

router.use('/auth', authRoutes);
router.use('/employees', employeesRoutes);

module.exports = router;
