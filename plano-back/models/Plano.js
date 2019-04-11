'use strict'

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Plano', {
        ano: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

}