const { Association } = require('sequelize');
let db = require('../data/models');



module.exports = {

    detail: async (req,res) => {
        let response = {
            
        }
        try {
            response.status = 200
            const equipos = await db.Equipos.findByPk(req.params.id, {include: [{association:'categoria'},{association:'marca'}]} )
            response = {...equipos.dataValues, ...response}
            response.rutaImg = '/img/img-equipos/' + equipos.imagen
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
            const listado = await db.Equipos.findAll({include: [{association:'categoria'}]})
            const categorias = await db.Categoria.findAll({include: [{association:'equipos'}]})
            response.count = listado.length
            response.countByCategory = {}
            categorias.forEach(categoria => {
                response.countByCategory[categoria.categoria] = categoria.equipos.length
            });
            response.products = listado.map((equipo)=>{
                return {
                    id: equipo.id,
                    nombre:equipo.nombre,
                    descripcion: equipo.descripcion,
                    detail: '/api/products/' + equipo.id,
                    category: equipo.categoria,
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