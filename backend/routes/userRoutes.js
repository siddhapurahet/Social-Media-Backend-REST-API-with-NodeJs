const express = require('express');
const signUp = require('../controllers/userController');
const getAllusers = require('../controllers/userController');
const login = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllusers);
router.post('/signup', signUp);
router.post('/login', login);


module.exports = router;