'use strict'

module.exports = function (sequelize, DataTypes) {
  const Curso = sequelize.define('Curso', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    turno: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

  Curso.associate = function (models) {
    Curso.hasMany(models.Grade, {
      foreignKey: {
        name: 'Curso',
        allowNull: false
      }
    })

    Curso.belongsToMany(models.Turma, {
      through: models.Vaga,
      foreignKey: 'Curso'
    })
  }

  return Curso
}