const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const path = require('path');
const { body, validationResult} = require('express-validator');
let db = require('../data/models');

const userController = require('../controllers/userController');




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

    body('usuario').notEmpty().withMessage('Tienes que escribir un usuario').isLength({ min: 2 }).withMessage('El campo debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electronico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('email').custom(async (value, { req }) => {
        const existingUser = await db.Usuarios.findOne({where:{ email: req.body.email }});
        console.log(existingUser);
        if (existingUser) {
            throw new Error('El correo electrónico ya está en uso');
        }
    }),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña').isLength({ min: 8 }).withMessage('El campo debe tener al menos 8 caracteres'),
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

const uploadFile = multer({storage: multerDiskStorage})
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

userRouter.get('/register', guestMiddleware, userController.register)

userRouter.post('/register', uploadFile.single("img"), validations, userController.registerProcess);

userRouter.get('/login', guestMiddleware, userController.login);

userRouter.post('/login', validations, userController.loginProcess);

userRouter.get('/profile', authMiddleware, uploadFile.single("img"), userController.profile)

userRouter.get('/logout', userController.logout)

module.exports = userRouter;