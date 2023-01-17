const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');

userRouter.get('/register', userController.register);

userRouter.get('/login', userController.login);

userRouter.get('/createdEdit', userController.createdEdit);

userRouter.get('/edit', userController.edit );

userRouter.get('/created', userController.created);

module.exports = userRouter;