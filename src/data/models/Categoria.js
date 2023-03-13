module.exports = (sequelize, dataTypes) => {
    const alias = 'Categoria';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        categoria:dataTypes.STRING,
    
    }
    const config = {
        tableName: 'categoria',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Categoria = sequelize.define(alias,cols,config)
    return Categoria
}