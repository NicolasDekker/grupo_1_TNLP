const express = require('express');
const app = express();
const mainRouter = require('./routes/mainRouter')

const path= require('path')

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo puerto 3000')
})

app.use('/', mainRouter)
