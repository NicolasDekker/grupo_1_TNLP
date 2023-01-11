const path = require('path');

const controller = {
    index: (req,res) => {
        res.render("home");
    },

    login: (req,res) => {
        res.render("login");
    },

    equipos: (req,res) => {
        res.render("equipos");
    },

    carrito: (req,res) => {
        res.render("carrito");
    },

    register: (req,res) => {
        res.render("register");
    },

    detailProduct: (req,res) => {
        res.render("detailProduct");
    }

}

module.exports = controller;