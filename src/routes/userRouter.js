const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const path = require('path');

const userController = require('../controllers/userController');

const { body} = require('express-validator');




const multerDiskStorage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, path.join(__dirname, "../../public/img/img-users"))
    },
    filename:(req, file, cb) =>{
        let imageName =Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    },
})

const validations =[
    body('usuario').notEmpty().withMessage('Tienes que escribir un usuario'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electronico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('img').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png'];
        
        if(!file){
            throw new Error('tienes que subir una imagen');
        }else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
            throw new Error('Las extensiones permitidas son .jpg y .png');
            }
        }

        
        return true;
    })
]

const uploadFile = multer({storage: multerDiskStorage})
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

userRouter.get('/register', guestMiddleware, userController.register)

userRouter.post('/profile', uploadFile.single("img"), validations, userController.registerProcess);

userRouter.get('/login', guestMiddleware, userController.login);

userRouter.post('/login', userController.loginProcess);

userRouter.get('/profile', authMiddleware, uploadFile.single("img"), userController.profile)

userRouter.get('/logout', userController.logout)

module.exports = userRouter;