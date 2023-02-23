//Modules

const express = require('express');
const app = express();
const path= require('path');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');



const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productsRouter = require('./routes/productsRouter');

app.use(express.urlencoded({extended: false}));


app.use(session({
    secret: "Es secreto",
    resave: false,
    saveUninitialized: false,
}));

//Configuration
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(cookies());
app.use(userLoggedMiddleware);

//Template Engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo puerto 3000');
})

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/products', productsRouter);






