const path = require('path');

const controller = {
    index: (req,res) => {
        res.render("home");
    },

    login: (req,res) => {
        res.render("login");
    },

    products: (req,res) => {
        res.render("products");
    },

    carrito: (req,res) => {
        res.render("carrito");
    },

    register: (req,res) => {
        res.render("register");
    },

    detailProduct: (req,res) => {
        res.render("detailProduct");
    },

    createEdit: (req,res) => {
        res.render("createEdit")
    }

}

module.exports = controller;