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
            console.log(product)
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
createProcess: async (req, res) =>{
    try {
        await db.Equipos.create({
            modelo: req.body.modelo,
            precio: req.body.precio,
            caracteristicas: req.body.caracteristicas,
            marca_id: req.body.marca_id,
            categoria_id: req.body.categoria_id,
            imagen: req.file.filename,
        });
        return res.redirect('create');
    } catch (error) {
        res.send(error);
}},

edit: async function (req, res) {
    try {
        console.log(req.params)
        const equipoId = req.params.id;
        const product = db.Equipos.findByPk(equipoId,  { include: ['marca', 'categoria'] });
        const marcaPromise = db.Marca.findAll();
        const categoriaPromise = db.Categoria.findAll();
        const [Equipos, allMarca, allCategoria] = await Promise.all([product, marcaPromise, categoriaPromise]);
        res.render("products/edit",{ product, Equipos, allMarca: allMarca, allCategoria:allCategoria });
    } catch (error) {
        res.send(error);
    }
},

    carrito: (req,res) => {
        return res.render("products/carrito");
    },

    delete: async function (req, res) {
        try {
            const equipoId = req.params.id;
            await db.Equipos.destroy({ where: { id: equipoId }, force: true });
            res.redirect('../create');
        } catch (error) {
            res.send(error);
        }
    },

    update: async function (req, res) {
        try {
            const equipoId = req.params.id;
            await db.Equipos.update({
                modelo: req.body.modelo,
                precio: req.body.precio,
                caracteristicas: req.body.caracteristicas,
                marca_id: req.body.marca_id,
                categoria_id: req.body.categoria_id,
                imagen: req.file.imagen,
        }, {
            where: { id: equipoId }
        });
            res.redirect('/products/create');
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = controllerProduct;
