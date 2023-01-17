const express = require('express');
const router= express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/register', mainController.register);

router.get('/carrito', mainController.carrito);

router.get('/products', mainController.products);

router.get('/login', mainController.login);

router.get('/detailProduct', mainController.detailProduct);

router.get('/createEdit', mainController.createEdit);

router.get('/modificaciones', mainController.modificaciones );

router.get('/altas', mainController.altas);






module.exports = router;