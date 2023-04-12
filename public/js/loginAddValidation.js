window.onload = function () {
    let form = document.querySelector('.form')


    form.email.focus();

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        let error = []

        let email = document.querySelector('#email')
        let password = document.querySelector('#password')
        let errores = document.querySelector('.error')
        errores.style.color = "white";

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