'use strict'

module.exports = function (sequelize, DataTypes) {
  const Vaga = sequelize.define('Vaga', {
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return Vaga
}