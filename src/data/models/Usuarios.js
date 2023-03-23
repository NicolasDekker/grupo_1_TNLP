module.exports = (sequelize, dataTypes) => {
    const alias = 'Usuarios';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usuario: dataTypes.STRING,
        email: dataTypes.STRING,
        imagen: dataTypes.STRING,
        pass: dataTypes.STRING,
        roles_id: dataTypes.INTEGER,
    }
    const config = {
        tableName: 'usuarios',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Usuarios = sequelize.define(alias,cols,config)
    
    Usuarios.associate = function(modelos){
        Usuarios.belongsTo(modelos.Roles, {
            as: "roles",
            foreignKey: 'roles_id'
        })
    }
    return Usuarios
}