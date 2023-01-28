const express = require('express');
const productsRouter = express.Router();

const productsController = require('../controllers/productsController');

productsRouter.get('/carrito', productsController.carrito);

productsRouter.get('/', productsController.list);

productsRouter.post('/create', productsController.createProcess);

productsRouter.get('/create', productsController.create);

productsRouter.delete('/delete/:id', productsController.delete)

productsRouter.get('/edit', productsController.edit );

productsRouter.get('/detailProduct', productsController.detailProduct);

module.exports = productsRouter;


