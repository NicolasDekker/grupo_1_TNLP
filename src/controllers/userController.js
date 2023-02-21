const path = require('path')
const fs = require('fs');
const usersJSON = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersJSON, 'utf-8'))
const { validationResult } = require('express-validator');
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
            password: bycriptjs.hashSync(req.body.password, 10),
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

    login: (req,res) => {
        res.render("users/login");
    },

    registerProcess: (req,res) => {

        const resultValidation = validationResult(req);



        if(resultValidation.errors.length > 0){
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        return res.render('users/profile')
    },

    register: (req,res) =>{
        res.render("users/register")
    },

    profile: (req,res) => {
        let user = users.find ( row => row.id == req.params.id)
        if (user) return res.render("users/profile/:id");
    },

    loginProcess: (req,res) => {
        let userToLogin = controllerUser.findByField('email', req.body.email);

        if(userToLogin){

        }
        return res.render(userToLogin);
        //res.render('./products/home')
    }
}


module.exports = controllerUser;