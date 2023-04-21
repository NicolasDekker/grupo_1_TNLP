const express = require('express');
const productsApiRouter = express.Router();

const productsApiController = require('../controllers/productsApiController');

productsApiRouter.get('/', productsApiController.list)
productsApiRouter.get('/:id', productsApiController.detail)



module.exports = productsApiRouter