'use strict'

module.exports = function (sequelize, DataTypes) {
    const CargaPos = sequelize.define('CargaPos', {
        trimestre: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        programa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        creditos: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    return CargaPos
}