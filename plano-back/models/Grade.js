'use strict'

module.exports = function (sequelize, DataTypes) {
  const Grade = sequelize.define('Grade', {
    periodoInicio: {
      type: DataTypes.STRING,
      allowNull: false
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

  Grade.associate = function (models) {

    Grade.belongsToMany(models.Disciplina, {
      through: models.DisciplinaGrade,
      foreignKey: 'Grade',
      onDelete: 'RESTRICT'
    })

  }

  return Grade
}