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

    /* findOne: async function (usuarioId) {
        try {
            const userFound = await db.Usuarios.findOne({ where: { id: usuarioId } });
            return userFound;
        } catch (error) {
            console.error(error);
        }
    }, */

    /* findByField: (field, text) => {
        let allUser = controllerUser.findAll();
        let userFound = allUser.find(oneUser => oneUser[field] === text)
        return userFound;
    }, */

    /* create: (userData) => {
        let allUser = controllerUser.findAll();
        let newUser = {
            id: controllerUser.generateId(),
        
            ...userData
        }
        allUser.push(newUser);
        fs.writeFileSync(controllerUser.fileName, JSON.stringify(allUser, null, ' '));
        return newUser
    },
 */
    generateId: () => {
        let allUser = controllerUser.findAll();
        let lastUser = allUser.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },

    /* delete: (id) => {
        let allUser = controllerUser.findAll();
        let finalUsers = allUser.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(controllerUser.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }, */

    registerProcess: async (req, res) =>{
        try {
            await db.Usuarios.create({
                usuario: req.body.usuario,
                email: req.body.email,
                imagen: req.file.filename,
                roles_id: 1,
                pass: bycriptjs.hashSync(req.body.password,10),
            });
            return res.redirect('login');
        } catch (error) {
            res.send(error);
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