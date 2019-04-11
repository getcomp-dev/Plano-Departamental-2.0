'use strict'

module.exports = function (sequelize, DataTypes) {
    const Plano = sequelize.define('Plano', {
        ano: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    return Plano
}