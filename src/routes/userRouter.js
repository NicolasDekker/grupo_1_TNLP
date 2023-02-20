const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const path = require('path');

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

const uploadFile = multer({storage: multerDiskStorage})

userRouter.get('/register', userController.register)

userRouter.post('/profile', uploadFile.single("img"), userController.registerProcess);

userRouter.get('/login', userController.login);

userRouter.get('/home', userController.loginProcess )

/* userRouter.get('/profile/:id', uploadFile.single("img"), userController.profile) */

module.exports = userRouter;