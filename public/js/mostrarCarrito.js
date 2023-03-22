if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', rdy)
} else {
    rdy()
}

function rdy(){
    if(JSON.parse(localStorage.getItem('productos')) == null || JSON.parse(localStorage.getItem('productos')).length == 0){
        emptyCart()
    }else {
        displayCart()
    };
}

function emptyCart(){
    console.log('estoy vacio')
}

function displayCart(){
    const padre = document.getElementById('padre')
    const card = JSON.parse(localStorage.getItem('productos'))
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
                            <h5 class="fw-normal mb-0">1</h5>
                        </div>
                        <div>
                            <h5 class="mb-0 me-3">$${card[i].precio}</h5>
                        </div>
                            <a href="#!" class="carrito-trash"><i
                            class="borrar-producto fas fa-trash-alt"></i></a>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}