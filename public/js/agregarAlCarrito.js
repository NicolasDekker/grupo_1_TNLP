if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', rdy)
} else {
    rdy()
}

function rdy(){
    if(JSON.parse(localStorage.getItem('productos')) == null){
        const carrito = []
        localStorage.setItem('productos', JSON.stringify(carrito))
    };
    let litleCar = document.getElementById('car')
    litleCar.addEventListener('click', agregarProducto)
    
}


function agregarProducto (){
    let producto = {
        id: document.getElementById('idProd').innerText,
        img: document.getElementById('img').alt,
        nombre: document.getElementById('nombre').innerText,
        caracteristicas: document.getElementById('caracteristicas').innerText,
        precio: parseFloat(document.getElementById('precio').innerText.replace('Precio: $', ''))
    }
    let carrito = JSON.parse(localStorage.getItem('productos'))
    if(carrito.length == 0){
        producto.cantidad = 1;
        producto.subtotal = producto.precio;
        carrito.push(producto)
    }else{
        let existe = carrito.find(row => row.id == producto.id)
        if (existe){
            existe.cantidad += 1;
            existe.subtotal += existe.precio;
        }else {
            producto.cantidad = 1;
            producto.subtotal = producto.precio;
            carrito = [...carrito, producto]
        }
    }
    localStorage.setItem('productos', JSON.stringify(carrito))
    
}