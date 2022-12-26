const express = require('express');
const app = express();

const path= require('path')

app.use('/static', express.static(__dirname + '/public'));
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Servidor corriendo puerto 3000')
})

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/home.html')
})

app.get('/login', (req,res) => {
    res.sendFile(path.resolve('./views/login.html'))
})

app.get('/register', (req,res) => {
    res.sendFile(path.resolve('./views/register.html'))
})

app.get('/equipos', (req,res) => {
    res.sendFile(path.resolve('./views/equipos.html'))
})

app.get('/carrito', (req,res) => {
    res.sendFile(path.resolve('./views/carrito.html'))
})

