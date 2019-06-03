'use strict'

module.exports = function (sequelize, DataTypes) {
    const Plano =  sequelize.define('Plano', {
        ano: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return Plano
}
