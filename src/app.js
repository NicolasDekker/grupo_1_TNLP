//Modules

const express = require('express');
const app = express();
const mainRouter = require('./routes/mainRouter');

const path= require('path');

//Configuration
app.use(express.static('public'));


//Template Engine
/* app.set('view engine', 'ejs');
app.set('views', '../src/views'); */

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo puerto 3000');
})


app.use('/', mainRouter);
