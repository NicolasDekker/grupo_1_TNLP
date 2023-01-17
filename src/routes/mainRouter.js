const express = require('express');
const mainRouter = express.Router();

const mainController = require('../controllers/mainController');

mainRouter.get('/', mainController.index);

mainRouter.get('/carrito', mainController.carrito);

mainRouter.get('/products', mainController.products)

mainRouter.get('/detailProduct', mainController.detailProduct);


module.exports = mainRouter;