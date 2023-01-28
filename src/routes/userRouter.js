const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');

userRouter.get('/register', userController.register);

userRouter.get('/login', userController.login);

module.exports = userRouter;