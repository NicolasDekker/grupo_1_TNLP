module.exports = (sequelize, dataTypes) => {
    const alias = 'Equipos_facturas';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        equipos_id: dataTypes.INTEGER,
        facturas_id: dataTypes.INTEGER,

    }
    const config = {
        tableName: 'equipos_facturas',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Equipos_facturas = sequelize.define(alias,cols,config)
    return Equipos_facturas
    
    Equipos_facturas.associate = function(modelos){
        Equipos_facturas.belongsToMany(modelos.Equipos, {
            as: "equipos",
            foreignKey: 'equipos_id'
        }),
        
        Equipos_facturas.belongsToMany(modelos.Facturas, {
            as: "facturas",
            foreignKey: 'facturas_id'
        })
    }
}