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

const uploadFile = multer({storage: multerDiskStorage})
const userRegisterMiddleware = require('../middlewares/userRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

userRouter.get('/register', guestMiddleware, userController.register);

userRouter.post('/profile',userRegisterMiddleware, uploadFile.single("img"), userController.registerProcess);

userRouter.get('/login', guestMiddleware, userController.login);

userRouter.post('/login', userRegisterMiddleware, userController.loginProcess);

userRouter.get('/profile', authMiddleware, uploadFile.single("img"), userController.profile)

userRouter.get('/logout', userController.logout)

module.exports = userRouter;