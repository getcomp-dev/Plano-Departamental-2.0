'use strict'

module.exports = function (sequelize, DataTypes) {
  const DocentePerfil = sequelize.define('DocentePerfil', {}, {
    freezeTableName: true,
    timestamps: false
  })
  return DocentePerfil
}