const path = require('path')
const fs = require('fs');
const productsJSON = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'))

const controllerProduct = {
   
    list: (req, res) => { // Método para renderizar el listado de productos
        return res.render("products/list", {products: products});
    },

    carrito: (req,res) => {
        res.render("products/carrito");
    },

    detailProduct: (req,res) => {
        res.render("products/detailProduct");
    }
}

module.exports = controllerProduct;
