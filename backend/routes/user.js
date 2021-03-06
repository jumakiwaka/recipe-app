const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');


router.post('/signup', userCtrl.signUp);

router.post('/login', userCtrl.logIn);

module.exports = router;