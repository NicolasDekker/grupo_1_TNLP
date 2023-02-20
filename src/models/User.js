// 1 Guardar al usuario en la DB
// 2 Buscar al usuario que se quiere loguear
// 3 Buscar a un usuario por su ID
// 4 Editar la informacion
// 5 Eliminar a un usuario de la DB
const path = require('path')
const fs = require('fs');
const usersJSON = path.join(__dirname, '../data/users.json');


const User = {

    fileName: usersJSON,

    getData: () => {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    create: (usarData) => {
    }
}

console.log(User.getData())