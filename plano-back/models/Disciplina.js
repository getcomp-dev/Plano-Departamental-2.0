'use strict'

module.exports = function (sequelize, DataTypes) {
  const Disciplina = sequelize.define('Disciplina', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cargaTeorica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cargaPratica: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

  Disciplina.associate = function (models) {
    Disciplina.hasMany(models.Turma, {
      foreignKey: {
        name: 'Disciplina',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    })

    Disciplina.belongsToMany(models.Grade, {
      through: models.DisciplinaGrade,
      foreignKey: 'Disciplina',
      onDelete: 'RESTRICT'
    })
  }

  return Disciplina
}