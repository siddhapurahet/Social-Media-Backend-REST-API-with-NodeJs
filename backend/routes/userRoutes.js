const express = require('express');
const getAllusers = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllusers);

module.exports = router;