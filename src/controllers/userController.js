const controllerUser = {
    login: (req,res) => {
        res.render("login");
    },

    register: (req,res) => {
        res.render("register");
    },

    createdEdit: (req,res) => {
        res.render("createdEdit");
    },

    edit: (req,res) =>{
        res.render("edit");
    },

    created: (req,res)=>{
        res.render("created");
    }

}

module.exports = controllerUser;