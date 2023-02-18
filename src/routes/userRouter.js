const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');

userRouter.get('/register', userController.register)

userRouter.post('/register', userController.registerProcess);

userRouter.get('/login', userController.login);

userRouter.get('/profile', userController.profile)

module.exports = userRouter;