if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', rdy)
} else {
    rdy()
}

function rdy(){
    if(JSON.parse(localStorage.getItem('productos')) == null || JSON.parse(localStorage.getItem('productos')).length == 0){
        cardEmpty()
    }else {
        displayCart()
    }
    let fullEmptyCard = document.getElementById('fullEmptyCard');
    fullEmptyCard.addEventListener('click',deletedCart);
    console.log(fullEmptyCard)
}

function displayCart(){
    const padre = document.getElementById('padre');
    const card = JSON.parse(localStorage.getItem('productos'));
    padre.innerHTML = `<h5 class="mb-3 "><a href="#!" class="text-white "><i
    class="fas fa-long-arrow-alt-left me-2 text-white"></i>Continuar comprando</a>
</h5>
<hr>
<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <p class="mb-1">Carrito de Compras</p>
        <p class="mb-0">Tienes ${card.length} artículos en tu carrito</p>
    </div>
    <div>
        <p class="mb-0 text-white"><span class="">Ordenar por:</span> <a href="#!"
                class="text-white">Precio <i
                    class="fas fa-angle-down mt-1"></i></a></p>
    </div>
</div>`;
    for(let i = 0; i< card.length; i++){
        padre.innerHTML += `
        <div class="card mb-3">
            <div class="card-carrito card-body ">
                <div class=" d-flex justify-content-between">
                    <div class=" d-flex flex-row align-items-center">
                        <div>
                            <img src="/img/img-equipos/${card[i].imagen}"
                                class="img-productos-carrito img-fluid rounded-3" alt="Shopping item"
                                style="width: 65px;">
                        </div>
                        <div class="ms-3">
                            <h5>${card[i].nombre}</h5>
                            <p class="small mb-0">256GB, Navy Blue</p>
                        </div>
                    </div>
                    <div class="d-flex flex-row align-items-center">
                        <div style="width: 50px;">
                            <i class="fas fa-plus" onClick='sumar(${card[i].id})'></i>
                            <h5 class="fw-normal mb-0">${card[i].cantidad}</h5>
                            <i class="fas fa-minus" onClick='restar(${card[i].id})'></i>
                        </div>
                        <div>
                            <h5 class="mb-0 me-3">$${card[i].subtotal}</h5>
                        </div>
                            <i class="borrar-producto fas fa-trash-alt carrito-trash" onClick='borrar(${card[i].id})'></i>
                    </div>
                </div>
            </div>
        </div>`
    }
    upDateTotal();
}

function borrar(id){
    const card = JSON.parse(localStorage.getItem('productos'));
    const deletedCard = card.filter(row => row.id != id);
    localStorage.setItem('productos', JSON.stringify(deletedCard));
    if(deletedCard.length <= 0){
        cardEmpty()
        return
    }
    displayCart();
}

function upDateTotal (){
    const card = JSON.parse(localStorage.getItem('productos'));
    const subtotal = document.getElementById('subtotal');
    const total = document.getElementById('total');
    const sumatoria = card.reduce((acum, actual) => acum + actual.subtotal, 0);
    subtotal.innerText = '$ ' + sumatoria;
    total.innerText = '$ ' + (sumatoria * 1.21 + 4500);

}

function sumar(id){
    const card = JSON.parse(localStorage.getItem('productos'));
    const agregar = card.find(row => row.id == id);
    agregar.cantidad += 1;
    agregar.subtotal = agregar.cantidad * agregar.precio;
    localStorage.setItem('productos', JSON.stringify(card));
    displayCart();
}

function restar(id){
    const card = JSON.parse(localStorage.getItem('productos'));
    const quitar = card.find(row => row.id == id);
    quitar.cantidad -= 1;
    quitar.subtotal = quitar.cantidad * quitar.precio;
    if(quitar.cantidad <= 0){
        borrar(id);
        return 
    }
    localStorage.setItem('productos', JSON.stringify(card));
    displayCart();
}

function cardEmpty(){
    const padre = document.getElementById('padre');
    padre.innerHTML = `<h5 class="mb-3 "><a href="/products" class="text-white "><i
    class="fas fa-long-arrow-alt-left me-2 text-white"></i>Comenza a comprar</a></h5>
    <hr>
    <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <p class="mb-1">Carrito de Compras</p>
        <p class="mb-0">Tienes 0 artículos en tu carrito</p>
    </div>
    <div>
        <p class="mb-0 text-white"><span class="">Ordenar por:</span> <a href="#!"
                class="text-white">Precio <i
                    class="fas fa-angle-down mt-1"></i></a></p>
    </div>
</div>`;
    upDateTotal()
}

function deletedCart( ){
    localStorage.setItem('productos', JSON.stringify([]));
    cardEmpty();
}

