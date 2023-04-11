window.onload = function () {
    let form = document.querySelector('.form')


    form.marca_id.focus();

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        let error = []

        let marca_id = document.querySelector('#marca')
        let modelo = document.querySelector('#productModel')
        let caracteristicas = document.querySelector('#descriptionText')
        let categoria_id = document.querySelector('#categoria')
        let precio = document.querySelector('#price')

        if (marca_id.value == '') {
            error.push('La marca no puede estar vacia')
            marca_id.classList.add('is-invalid')
        } else {
            marca_id.classList.remove('is-invalid')
            marca_id.classList.add('is-valid')
        }
        
        if (modelo.value == '') {
            error.push('El modelo no puede estar vacio')
            modelo.classList.add('is-invalid')
        } else if (modelo.value.length < 5) {
            error.push('Debe contener al menos 5 caracteres')
            modelo.classList.add('is-invalid')
        } else {
            modelo.classList.remove('is-invalid')
            modelo.classList.add('is-valid')
        }

        if (caracteristicas.value == '') {
            error.push('Las caracteristicas no pueden estar vacias')
            caracteristicas.classList.add('is-invalid')
        } else if (caracteristicas.value.length < 20) {
            error.push('Debe contener al menos 20 caracteres')
            caracteristicas.classList.add('is-invalid')
        }else {
            caracteristicas.classList.remove('is-invalid')
            caracteristicas.classList.add('is-valid')
        }

        if (categoria_id.value == '') {
            error.push('La categoria no puede estar vacia')
            categoria_id.classList.add('is-invalid')
        } else {
            categoria_id.classList.remove('is-invalid')
            categoria_id.classList.add('is-valid')
        }

        if (precio.value == '') {
            error.push('El precio no puede estar vacio')
            precio.classList.add('is-invalid')
        } else {
            precio.classList.remove('is-invalid')
            precio.classList.add('is-valid')
        }

        let ulError = document.querySelector(".error")
        ulError.innerHTML = ``
        if (error.length > 0) {

            ulError.classList.add('alert-warning')

            for (let i = 0; i < error.length; i++) {
                ulError.innerHTML += `<li>${error[i]}</li>`
            }
        } else {
            form.submit()
            }
        
    })
}