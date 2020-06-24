'use strict'

module.exports = function (sequelize, DataTypes) {
    const Plano =  sequelize.define('Plano', {
        ano: {
            type: DataTypes.INTEGER
        },
        obs: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return Plano
}
