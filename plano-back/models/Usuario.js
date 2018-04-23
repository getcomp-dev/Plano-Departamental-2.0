'use strict';

module.exports = function (sequelize, DataTypes) {
    const Usuario = sequelize.define('Usuario', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Usuario;
};