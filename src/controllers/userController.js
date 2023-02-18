const path = require('path')
const fs = require('fs');
const usersJSON = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersJSON, 'utf-8'))

const controllerUser = {
    login: (req,res) => {
        res.render("users/login");
    },

    register: (req,res) =>{
        res.render("users/register")
    },

    registerProcess: (req,res) => {
        console.log(req.body)
        let id = users[users.length-1].id + 1;
        let usuarioNuevo = {id, ...req.body}
        console.log(usuarioNuevo)
        users.push(usuarioNuevo);
        fs.writeFileSync(usersJSON, JSON.stringify(users, null, 2))
        return res.redirect('/profile')
    },

    profile: (req,res) => {
        return res.render('profile')
    }
}


module.exports = controllerUser;