const express = require('express');
const router = express.Router();

const { signupcontroller, signinController } = require('./controllers/auth');

router.post('/signup', signupcontroller);
router.post('/signin', signinController);
