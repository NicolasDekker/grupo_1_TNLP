const controllerUser = {
    login: (req,res) => {
        res.render("users/login");
    },

    register: (req,res) => {
        res.render("users/register");
    },

    createdEdit: (req,res) => {
        res.render("users/createdEdit");
    },

    edit: (req,res) =>{
        res.render("users/edit");
    },

    created: (req,res)=>{
        res.render("users/created");
    }

}

module.exports = controllerUser;