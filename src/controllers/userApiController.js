let db = require('../data/models');



module.exports = {

    detail: async (req,res) => {
        let response = {
            
        }
        try {
            response.status = 200
            const usuario = await db.Usuarios.findByPk(req.params.id)
            usuario.pass = undefined
            usuario.roles_id = undefined
            response = {...usuario.dataValues, ...response}
            response.rutaImg = '/img/img-users/' + usuario.imagen
            return res.json(response)
        } catch (error) {
            response.status = 403
            response.msg = error.msg
            return res.json(response)
        }
    },

    list: async (req,res) => {
        let response = {
            
        }
        try {
            response.status = 200
            const listado = await db.Usuarios.findAll()
            response.count = listado.length
            response.users = listado.map((usuario)=>{
                return {
                    id: usuario.id,
                    nombre:usuario.nombre,
                    email:usuario.email,
                    detail: '/api/users/' + usuario.id
                }
            })
            return res.json(response)
        } catch (error) {
            response.status = 403
            response.msg = error.msg
            return res.json(response)
        }
    }
}