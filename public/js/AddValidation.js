window.onload = function(){
    let titulo = document.querySelector('.moviesAddTitulo')
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');

//------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
//-------------------DE REGISTRO DE PELÍCULAS------------------//    

    let form = document.querySelector('.form');

    form.title.focus();

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        let errors = []

        let title = document.querySelector('#title')
        let rating = document.querySelector('#rating')
        let awards = document.querySelector('#awards')
        let release_date = document.querySelector('#release_date')
        let length = document.querySelector('#length')
        let genre_id = document.querySelector('#genre_id')


        if (title.value == '') {
            errors.push('El titulo no puede estar vacio')
            title.classList.add('is-invalid')
        }
        else {
            title.classList.remove('is-invalid')
            title.classList.add('is-valid')
        }

        if (rating.value <= 0 || rating.value > 10) {
            errors.push('El rating tiene que estar entre 1 y 10')
            rating.classList.add('is-invalid')
        }
        else {
            rating.classList.remove('is-invalid')
            rating.classList.add('is-valid')
        }

        if (release_date.value == '') {
            errors.push('La fecha no puede estar vacia')
            release_date.classList.add('is-invalid')
        }
        else {
            release_date.classList.remove('is-invalid')
            release_date.classList.add('is-valid')
        }

        if (length.value < 60 || length.value > 360) {
            errors.push('El largo de la pelicula tiene que estar entre 60 y 360')
            length.classList.add('is-invalid')
        }
        else {
            length.classList.remove('is-invalid')
            length.classList.add('is-valid')
        }

        if (genre_id.value == '') {
            errors.push('El genero no puede estar vacio')
            genre_id.classList.add('is-invalid')
        }
        else {
            genre_id.classList.remove('is-invalid')
            genre_id.classList.add('is-valid')
        }

        if (awards.value <= 0 || awards.value > 10) {
            errors.push('Los premios tienen que estar entre 1 y 10')
            awards.classList.add('is-invalid')
        }
        else {
            awards.classList.remove('is-invalid')
            awards.classList.add('is-valid')
        }
        let ulErrors = document.querySelector(".errores")
        ulErrors.innerHTML = ``
        if (errors.length > 0) {
            
            ulErrors.classList.add('alert-warning')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo malio sal!'
            })
            for (let i=0; i<errors.length; i++) {
                ulErrors.innerHTML += `<li>${errors[i]}</li>`
            }
        }
        else {
            let model = {
                title: title.value,
                rating: rating.value,
                awards: awards.value,
                release_date: release_date.value,
                length: length.value,
                genre_id: genre_id.value,
            }
            const response = await fetch('/api/movies/create', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(model)
            })

            const infoResputa = await response.json()
            if (infoResputa.meta.status == 200) {
                Swal.fire(
                    'Good job!',
                    'Pelicula creada correctamente!',
                    'success'
                )
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo malio sal!'
                })
            }
            // '/api/movies/create' POST 
            
        }

    })


}