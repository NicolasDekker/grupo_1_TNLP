const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require("path");


const multerDiskStorage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, path.join(__dirname, "../../public/img/img-equipos"))
    },
    filename:(req, file, cb) =>{
        let imageName =Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    },
})

const uploadFile = multer({storage: multerDiskStorage})

productsRouter.get('/', productsController.list);  // Listado de productos

productsRouter.get('/carrito', productsController.carrito); //Entrando a la vista del carrito

productsRouter.get('/create', productsController.create); // Formulario de crearcion de productos

productsRouter.post('/create', uploadFile.single("img"), productsController.createProcess); //Accion de creando productos nuevos

productsRouter.delete('/delete/:id', productsController.delete);  //Accion de borrado

productsRouter.get('/edit/:id', productsController.edit); // Formulario de edición de productos

productsRouter.put('/list/:id', productsController.update)

productsRouter.get('/detailProduct/:id', uploadFile.single("img"), productsController.detailProduct);

module.exports = productsRouter;


