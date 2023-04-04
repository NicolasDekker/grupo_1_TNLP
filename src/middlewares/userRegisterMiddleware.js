
const user = require('../controllers/userController')
const db = require('../data/models');
const { body, validationResult} = require('express-validator');


function userRegisterMiddleware (req, res, next){
    body('usuario').notEmpty().withMessage('Tienes que escribir un usuario').isLength({ min:2 }),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electronico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('img').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
        
        if(!file){
            throw new Error('tienes que subir una imagen');
        }else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
            throw new Error('Las extensiones permitidas son .jpg y .png');
            }
        }

        
        return true;
    }
    )
    next();
}

module.exports = userRegisterMiddleware;