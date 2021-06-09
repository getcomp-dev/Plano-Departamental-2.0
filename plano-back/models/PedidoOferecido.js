'use strict'

module.exports = function (sequelize, DataTypes) {
    const PedidoOferecido = sequelize.define('PedidoOferecido', {
        vagasOferecidas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vagasOcupadas: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true
    })
    return PedidoOferecido
}