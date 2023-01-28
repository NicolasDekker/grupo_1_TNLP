const path = require('path')
const fs = require('fs');
const productsJSON = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'))

const controllerProduct = {

    list: (req, res) => { // Método para renderizar el listado de productos
        return res.render("products/list", {products: products});
    },

    createProcess: (req, res) =>{  // Método para crear un producto
        let id = products[products.length-1].id + 1;
        console.log(req.body)
        let productoNuevo = {id, ...req.body}
        console.log(productoNuevo)
        products.push(productoNuevo);
        fs.writeFileSync(productsJSON, JSON.stringify(products, null, 2))
        return res.redirect('/products')
    },

    create: (req,res) => {
        res.render("products/create", {products: products});
    },

    edit: (req,res) =>{
        res.render("products/edit");
    },

    carrito: (req,res) => {
        return res.render("products/carrito");
    },

    detailProduct: (req,res) => {
        return res.render("products/detailProduct");
    },

    delete: (req, res) => {
        let productFiltrados = products.filter(product => product.id != req.params.id)
        fs.writeFileSync(productsJSON, JSON.stringify(productFiltrados, null, 2))
        return res.render('products/list', {products: productFiltrados})
    }
}

module.exports = controllerProduct;
