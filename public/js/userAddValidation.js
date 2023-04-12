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

        if (usuario.value.length < 2) {
            error.push('El usuario debe contener al menos 2 caracteres')
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

        if (password.value.length < 8) {
            error.push('La contraseña debe contener al menos 8 caracteres')
            password.classList.add('is-invalid')
        }else {
            password.classList.remove('is-invalid')
            password.classList.add('is-valid')
        }

        function validateImageExtension(img) {
            const extension = (img.split('.').pop());
            console.log(extension)
            const extensiones = ["jpg", 'png', 'jpeg', 'gif'];
            if(extensiones.includes(extension) && img != ''){
                return true
            }else{
                return false
            }
        }

        const isValidExtension = validateImageExtension(img.value);
        console.log(isValidExtension)
        console.log(img.value)
        if (!isValidExtension) {

            error.push('La imagen debe ser de tipo JPG, JPEG, PNG, GIF')
            img.classList.add('is-invalid')
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