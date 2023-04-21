const express = require('express');
const userApiRouter = express.Router();

const userApiController = require('../controllers/userApiController');

userApiRouter.get('/', userApiController.list)
userApiRouter.get('/:id', userApiController.detail)


module.exports = userApiRouter