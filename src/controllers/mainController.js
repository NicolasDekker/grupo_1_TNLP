const path = require('path');

const controller = {
    index: (req,res) => {
        res.render("home");
    },

    login: (req,res) => {
        res.render(path.join(__dirname, "../views/login"));
    },

    equipos: (req,res) => {
        res.render(path.join(__dirname, "../views/equipos"));
    },

    carrito: (req,res) => {
        res.render(path.join(__dirname, "../views/carrito"));
    },

    register: (req,res) => {
        res.render(path.join(__dirname, "../views/register"));
    }

}

module.exports = controller;