const express = require('express');
const router = new express.Router();
const employeesRoutes = require('./employees-routes');

router.use('/employees', employeesRoutes);

module.exports = router;
