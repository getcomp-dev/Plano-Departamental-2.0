'use strict'

module.exports = function (sequelize, DataTypes) {
  const ConceitoTurmaCurso = sequelize.define('ConceitoTurmaCurso', {

    avaliacao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true
  })
  return ConceitoTurmaCurso
}