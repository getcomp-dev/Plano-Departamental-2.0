'use strict'

module.exports = function (sequelize, DataTypes) {
  const DisciplinaGrade = sequelize.define('DisciplinaGrade', {
    periodo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return DisciplinaGrade
}