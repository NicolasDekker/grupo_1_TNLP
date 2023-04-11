const path = require('path')
const fs = require('fs');
let db = require('../data/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult, body, cookie } = require('express-validator');
const bycriptjs = require('bcrypt')

const controllerUser = {

    fileName: db.Usuarios,

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

    generateId: () => {
        let allUser = controllerUser.findAll();
        let lastUser = allUser.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },
    
    registerProcess: async (req, res) =>{
        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    console.log(errors);
                    return res.render("users/register", {errors : errors.mapped(),infoEscrita: req.body})
                    
                }
            await db.Usuarios.create({
                usuario: req.body.usuario,
                email: req.body.email,
                imagen: req.file.filename,
                roles_id: 1,
                pass: bycriptjs.hashSync(req.body.password,10),
            });
            
            return res.redirect('login');
        } catch (error) {
            res.render("users/register", {error})
            
    }},
    
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

    loginProcess: async (req, res) => {
        try {
            const userToLogin = await db.Usuarios.findOne({ where: { email: req.body.email } });
            if (userToLogin) {
                console.log(req.body.password);
                console.log(userToLogin.pass);
            const isOkThePassword = bycriptjs.compareSync(req.body.password, userToLogin.pass);
            if (isOkThePassword) {
                delete userToLogin.pass;
                req.session.userLogged = userToLogin;
                
                if (req.body.remember_user) {
                res.cookie('userEmail', req.body.email, { maxAge: 60000 * 60 });
                }
                
                return res.redirect('/users/profile');
            }
            return res.render('users/login', {
                errors: {
                email: {
                msg: 'Las credenciales son invalidas',
                },
                },
            });
        }
            return res.render('users/login', {
            errors: {
                email: {
                msg: 'El mail es incorrecto',
                },
            },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error de servidor');
        }
    }
    
    
    
    
}

module.exports = controllerUser;