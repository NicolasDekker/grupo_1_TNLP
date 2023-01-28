// Importando librerias
const express = require('express');
const mainRouter = express.Router();

//JSON
const mainController = require('../controllers/mainController');

mainRouter.get('/', mainController.index);

// Exportamos
module.exports = mainRouter;