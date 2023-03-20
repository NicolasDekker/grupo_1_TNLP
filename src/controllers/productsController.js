const path = require('path')
const fs = require('fs');
let db = require('../data/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


const controllerProduct = {

    'list': async (req, res) => {
        try {
            const products = await db.Equipos.findAll();
                res.render('products/list', {products:products})
        } catch (error){
            res.send(error)
        }
    },

    "detailProduct": async function (req, res) {
        try {
            const product = await db.Equipos.findByPk(req.params.id);
            res.render('products/detailProduct.ejs', { product: product });
        } catch (error) {
            res.send(error);
        }
    },

    create:async (req,res) => {
        try{
            const allCategoria = await db.Categoria.findAll();
            const allMarca = await db.Marca.findAll();
            const products = await db.Equipos.findAll();
            res.render("products/create", {allMarca: allMarca, products: products, allCategoria: allCategoria});
        } catch (error) {
            res.send(error);
    }
},

    createProcess: (req, res) =>{  // Método para crear un producto
        let id = products[products.length-1].id + 1;
        let productoNuevo = {id, ...req.body}
        productoNuevo.img = req.file.filename
        products.push(productoNuevo);
        fs.writeFileSync(productsJSON, JSON.stringify(products, null, 2))
        return res.redirect('/products')
    },

    edit: (req,res) =>{
        let product = products.find(row => row.id == req.params.id)
        console.log(req.body);
        
        res.render("products/edit", {product: product});
    },

    carrito: (req,res) => {
        return res.render("products/carrito");
    },

    delete: (req, res) => {
        let productFiltrados = products.filter(product => product.id != req.params.id)
        fs.writeFileSync(productsJSON, JSON.stringify(productFiltrados, null, 2))
        return res.render('products/list', {products: productFiltrados})
    },

    update: (req, res) => {
        products.forEach(row => {
            if (row.id == req.params.id) {
                row.marca = req.body.marca
                row.modelo = req.body.modelo
                row.categoria = req.body.categoria
                row.precio = req.body.precio
                row.caracteristicas = req.body.caracteristicas
            }
        })
        fs.writeFileSync(productsJSON, JSON.stringify(products, null, 2))
        return res.redirect('/products')
    },
}

module.exports = controllerProduct;
