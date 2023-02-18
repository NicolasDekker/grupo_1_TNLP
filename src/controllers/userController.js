const path = require('path')
const fs = require('fs');
const usersJSON = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersJSON, 'utf-8'))

const controllerUser = {
    login: (req,res) => {
        res.render("users/login");
    },

    registerProcess: (req,res) => {
        let id = users[users.length-1].id + 1;
        let usuarioNuevo = {id, ...req.body}
        usuarioNuevo.img = req.file.filename
        users.push(usuarioNuevo);
        fs.writeFileSync(usersJSON, JSON.stringify(users, null, 2))
        return res.render('users/profile')
        
    },

    register: (req,res) =>{
        res.render("users/register",  {users: users})
    },

    profile: (req,res) => {
        let user = users.find ( row => row.id == req.params.id)
        if (user) return res.render("users/profile" , {user: user });
    }
}



module.exports = controllerUser;