const user = require('../controllers/userController')

function userLoggedMiddleware (req, res, next){

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = user.findByField('email', emailInCookie);
    
    if (userFromCookie) {
        req.session.userLogged = userFromCookie;

    }

    console.log(userFromCookie);

    


    next();
}

module.exports = userLoggedMiddleware;