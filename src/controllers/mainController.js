const controllerMain = {
    index: (req,res) => {
        res.render("products/home");
    },

    products: (req,res) => {
        res.render("products/products");
    },

    carrito: (req,res) => {
        res.render("products/carrito");
    },

    detailProduct: (req,res) => {
        res.render("products/detailProduct");
    }
}

module.exports = controllerMain;