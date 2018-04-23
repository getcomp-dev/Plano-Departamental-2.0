'use strict';

module.exports = function (sequelize, DataTypes) {
    const Horario = sequelize.define('Horario', {
        dia: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        inicio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fim: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Horario;
};