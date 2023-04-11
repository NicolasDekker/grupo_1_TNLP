window.onload = function () {
    let form = document.querySelector('.form')


    form.usuario.focus();

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        let error = []

        let usuario = document.querySelector('#usuario')
        let email = document.querySelector('#email')
        let password = document.querySelector('#password')
        let img = document.querySelector('#imgProduct')

        if (usuario.value == '') {
            error.push('El usuario no puede estar vacio')
            usuario.classList.add('is-invalid')
        } else if (usuario.value.length < 2) {
            error.push('debe contener al menos 2 caracteres')
            usuario.classList.add('is-invalid')
        } else {
            usuario.classList.remove('is-invalid')
            usuario.classList.add('is-valid')
        }

        if (email.value == '') {
            error.push('El email no puede estar vacio')
            email.classList.add('is-invalid')
        } else {
            email.classList.remove('is-invalid')
            email.classList.add('is-valid')
        }

        if (password.value == '') {
            error.push('Debe escribir su contraseña')
            password.classList.add('is-invalid')
        } else if (password.value.length < 8) {
            error.push('debe contener al menos 8 caracteres')
            password.classList.add('is-invalid')
        }else {
            password.classList.remove('is-invalid')
            password.classList.add('is-valid')
        }

        /* function validateImageExtension(img) {
            const extension = img.isIn('.jpg', '.jpeg', '.png', '.gif', img.split('.').pop());
            return extension;
        }

        const isValidExtension = validateImageExtension(img);

        if (isValidExtension) {
            error.push('La imagen debe ser de tipo JPG, JPEG, PNG, GIF')
            img.classList.add('is-invalid')
        } */

        let ulError = document.querySelector(".error")
        ulError.innerHTML = ``
        if (error.length > 0) {

            ulError.classList.add('alert-warning')

            for (let i = 0; i < error.length; i++) {
                ulError.innerHTML += `<li>${error[i]}</li>`
            }
        } else {
            let model = {
                usuario: usuario.value,
                email: email.value,
                img: img.value,
                genre_id: genre_id.value,
            }
        }
    })
}