const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/register', mainController.register);

router.get('/carrito', mainController.carrito);

router.get('/equipos', mainController.equipos);

router.get('/login', mainController.login);


module.exports = router;