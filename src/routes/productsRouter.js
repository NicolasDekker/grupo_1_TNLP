const express = require('express');
const productsRouter = express.Router();

const productsController = require('../controllers/productsController');

productsRouter.get('/carrito', productsController.carrito);

productsRouter.get('/', productsController.list);

productsRouter.get('/detailProduct', productsController.detailProduct);

module.exports = productsRouter;


