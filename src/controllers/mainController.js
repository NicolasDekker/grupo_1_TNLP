const controllerMain = {
    index: (req,res) => {
        res.render("home");
    },

    products: (req,res) => {
        res.render("products");
    },

    carrito: (req,res) => {
        res.render("carrito");
    },

    detailProduct: (req,res) => {
        res.render("detailProduct");
    }
}

module.exports = controllerMain;