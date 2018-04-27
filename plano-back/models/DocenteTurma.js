'use strict'

module.exports = function (sequelize, DataTypes) {
  const DocenteTurma = sequelize.define('DocenteTurma', {}, {
    freezeTableName: true,
    timestamps: false
  })
  return DocenteTurma
}