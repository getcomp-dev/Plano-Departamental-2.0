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
    },
    editado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
  }, {
    freezeTableName: true
  })
  return Pedido
}