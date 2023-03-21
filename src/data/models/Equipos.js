module.exports = (sequelize, dataTypes) => {
    const alias = 'Equipos';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        marca_id: dataTypes.INTEGER,
        categoria_id: dataTypes.INTEGER,
        modelo: dataTypes.STRING,
        precio: dataTypes.DECIMAL,
        caracteristicas: dataTypes.STRING,
        imagen: dataTypes.BLOB,
        stock: dataTypes.INTEGER        
    }
    const config = {
        tableName: 'equipos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Equipos = sequelize.define(alias,cols,config);
    
    Equipos.associate = function(modelos){
        Equipos.belongsTo(modelos.Categoria, {
            as: "categoria",
            foreignKey: 'categoria_id'
        }),
        
        Equipos.belongsTo(modelos.Marca, {
            as: "marca",
            foreignKey: 'marca_id'
        })
    }
    return Equipos
};