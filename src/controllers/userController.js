const path = require('path')
const fs = require('fs');
const usersJSON = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersJSON, 'utf-8'))
const { validationResult, body, cookie } = require('express-validator');
const bycriptjs = require('bcryptjs')

const controllerUser = {

    fileName: usersJSON,

    getData: () => {
        return JSON.parse(fs.readFileSync(controllerUser.fileName, 'utf-8'));
    },

    findAll: () => {
        return controllerUser.getData();
    },

    findByPk: (id) => {
        let allUser = controllerUser.findAll();
        let userFound = allUser.find(oneUser => oneUser.id === id)
        return userFound;
    },

    findByField: (field, text) => {
        let allUser = controllerUser.findAll();
        let userFound = allUser.find(oneUser => oneUser[field] === text)
        return userFound;
    },

    create: (userData) => {
        let allUser = controllerUser.findAll();
        let newUser = {
            id: controllerUser.generateId(),
        
            ...userData
        }
        allUser.push(newUser);
        fs.writeFileSync(controllerUser.fileName, JSON.stringify(allUser, null, ' '));
        return newUser
    },

    generateId: () => {
        let allUser = controllerUser.findAll();
        let lastUser = allUser.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },

    delete: (id) => {
        let allUser = controllerUser.findAll();
        let finalUsers = allUser.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(controllerUser.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    },

    
    registerProcess: (req,res) => {
        
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        
        let userInDB = controllerUser.findByField('email', req.body.email)
        
        if(userInDB){
            return res.render('users/register', {
                errors: {
                    email:{
                        msg: "Este email ya esta registrado"
                    }
                },
                oldData: req.body
            });
        }
        
        let userToCreate = {
            ...req.body,
            img: req.file.filename,
            password: bycriptjs.hashSync(req.body.password, 10)
        }
        
        
        let userCreate = controllerUser.create(userToCreate)
        return res.redirect('login')
    },
    
    register: (req,res) =>{
        res.render("users/register")
    },
    
    profile: (req,res) => {
        return res.render("users/profile", {
            user: req.session.userLogged
        });
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    },

    login: (req,res) => {
        return res.render("users/login");
    },
    
    loginProcess: (req,res) => {
        let userToLogin = controllerUser.findByField('email', req.body.email);
        if(userToLogin){
            let isOkThePassword = bycriptjs.compareSync(req.body.password, userToLogin.password)
            if (isOkThePassword){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if(req.body.remember_user){
                    res.cookie('userEmail', req.body.email, { maxAge: (60000 * 60) })
                }
                
                return res.redirect("/users/profile")
            }
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son invalidas'
                    }
                }
        });
    }

        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'El mail es incorrecto'
                }
            }
        });
    }
}


module.exports = controllerUser;