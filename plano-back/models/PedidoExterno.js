'use strict'

module.exports = function (sequelize, DataTypes) {
    const PedidoExterno = sequelize.define('PedidoExterno', {
        vagasPeriodizadas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vagasNaoPeriodizadas: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true
    })
    return PedidoExterno
}