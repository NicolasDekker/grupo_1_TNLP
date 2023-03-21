module.exports = (sequelize, dataTypes) => {
    const alias = 'Facturas';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usuarios_id: dataTypes.INTEGER,
        fecha_venta: dataTypes.STRING,
        total_factura: dataTypes.DECIMAL(15)

    }
    const config = {
        tableName: 'facturas',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Facturas = sequelize.define(alias,cols,config)
    
    Facturas.associate = function(modelos){
        Facturas.belongsTo(modelos.Usuarios, {
            as: "usuarios",
            foreignKey: 'usuarios_id'
        })
    }
    return Facturas
}