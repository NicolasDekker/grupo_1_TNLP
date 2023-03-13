module.exports = (sequelize, dataTypes) => {
    const alias = 'Roles';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        jerarquia: dataTypes.STRING


    }
    const config = {
        tableName: 'roles',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Roles = sequelize.define(alias,cols,config)
    return Roles
}