'use strict'

module.exports = function (sequelize, DataTypes) {
  const Pedido = sequelize.define('Pedido', {
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
  return Pedido
}