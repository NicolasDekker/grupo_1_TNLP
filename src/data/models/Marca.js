module.exports = (sequelize, dataTypes) => {
    const alias = 'Marca';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: dataTypes.STRING


    }
    const config = {
        tableName: 'marca',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Marca = sequelize.define(alias,cols,config)
    return Marca
}