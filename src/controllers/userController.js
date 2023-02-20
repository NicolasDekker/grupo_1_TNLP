const path = require('path')
const fs = require('fs');
const usersJSON = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersJSON, 'utf-8'))
const bycriptjs = require('bcryptjs')

const controllerUser = {
    login: (req,res) => {
        res.render("users/login");
    },

    registerProcess: (req,res) => {
        let id = users[users.length-1].id + 1;
        let usuarioNuevo = {id, ...req.body, password: bycriptjs.hashSync(req.body.password, 10)}
        usuarioNuevo.img = req.file.filename
        users.push(usuarioNuevo);
        fs.writeFileSync(usersJSON, JSON.stringify(users, null, 2))
        return res.render('users/profile', {usuarioNuevo: usuarioNuevo})
    },

    register: (req,res) =>{
        res.render("users/register",  {users: users})
    },

    profile: (req,res) => {
        console.log(req.body)
        let user = users.find ( row => row.id == req.params.id)
        console.log(user)
        if (user) return res.render("users/profile/:id");
    },

    loginProcess: (req,res) => {
        res.render('./products/home')
    }
}



module.exports = controllerUser;