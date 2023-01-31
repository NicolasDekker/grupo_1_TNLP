const express = require('express');
const productsRouter = express.Router();

const productsController = require('../controllers/productsController');

productsRouter.get('/', productsController.list);  // Listado de productos

productsRouter.get('/carrito', productsController.carrito); //Entrando a la vista del carrito

productsRouter.get('/create', productsController.create); // Formulario de crearcion de productos

productsRouter.post('/create', productsController.createProcess); //Accion de creando productos nuevos

productsRouter.delete('/delete/:id', productsController.delete);  //Accion de borrado

productsRouter.get('/edit/:id', productsController.edit); // Formulario de edición de productos

productsRouter.put('/list/:id', productsController.update)

productsRouter.get('/detailProduct', productsController.detailProduct);

module.exports = productsRouter;


