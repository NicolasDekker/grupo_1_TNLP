const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require("path");
const { body } = require('express-validator');


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

const validations =[

    body('modelo').notEmpty().withMessage('Tienes que escribir el modelo').isLength({ min: 5 }).withMessage('El campo debe tener al menos 5 caracteres'),
    body('caracteristicas').notEmpty().withMessage('Tienes que escribir las caracteristicas').isLength({ min: 20 }).withMessage('El campo debe tener al menos 20 caracteres'),
    body('img').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.pneg', '.gif'];
        
        if(!file){
            throw new Error('tienes que subir una imagen');
        }else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
            throw new Error('Las extensiones permitidas son .jpg, .pneg, .gif y .png ');
            }
        }
        return true;
    })
]

productsRouter.get('/', productsController.list);  // Listado de productos

productsRouter.get('/carrito', productsController.carrito); //Entrando a la vista del carrito

productsRouter.get('/create', productsController.create); // Formulario de crearcion de productos

productsRouter.post('/create', uploadFile.single("img"), validations, productsController.createProcess); //Accion de creando productos nuevos

productsRouter.delete('/delete/:id', productsController.delete);  //Accion de borrado

productsRouter.get('/edit/:id', productsController.edit); // Formulario de edición de productos

productsRouter.put('/list/:id', validations, productsController.update)

productsRouter.get('/detailProduct/:id', uploadFile.single("img"), productsController.detailProduct);

module.exports = productsRouter;


