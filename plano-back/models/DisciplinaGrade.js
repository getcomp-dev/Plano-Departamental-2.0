'use strict'

module.exports = function (sequelize, DataTypes) {
  const DisciplinaGrade = sequelize.define('DisciplinaGrade', {
    periodo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    obrigatoria: {
      type: DataTypes.TINYINT,
      allowNull: false,
      default: 0
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return DisciplinaGrade
}