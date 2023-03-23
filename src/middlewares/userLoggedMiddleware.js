
const user = require('../controllers/userController')
const db = require('../data/models');
function userLoggedMiddleware (req, res, next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    if (req.session.userLogged){
        if(emailInCookie){
            
            db.Usuarios.findOne({where: {email: emailInCookie}}).then((usuario)=>{
                if(usuario.email == emailInCookie){
                    delete usuario.pass;
                    req.session.userLogged = usuario;
                    res.locals.isLogged = true;
                    res.locals.userLogged = req.session.userLogged;
                }
            })
            .catch((error) =>{
                console.log(error);
            })
        }
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}
module.exports = userLoggedMiddleware;