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
        let productoNuevo = {id, ...req.body}
        productoNuevo.img = req.file.filename
        products.push(productoNuevo);
        fs.writeFileSync(productsJSON, JSON.stringify(products, null, 2))
        return res.redirect('/products')
    },

    create: (req,res) => {
        res.render("products/create", {products: products});
    },

    edit: (req,res) =>{
        let product = products.find(row => row.id == req.params.id)
        console.log(req.body);
        
        res.render("products/edit", {product: product});
    },

    carrito: (req,res) => {
        return res.render("products/carrito");
    },

    detailProduct: (req,res) => {
            let product = products.find ( row => row.id == req.params.id)
        if (product) return res.render("products/detailProduct" , {product:product });
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
