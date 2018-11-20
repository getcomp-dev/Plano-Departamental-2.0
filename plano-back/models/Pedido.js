'use strict'

module.exports = function (sequelize, DataTypes) {
  const Pedido = sequelize.define('Pedido', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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