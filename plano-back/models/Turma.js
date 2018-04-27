'use strict'

module.exports = function (sequelize, DataTypes) {
  const Turma = sequelize.define('Turma', {
    periodo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    letra: {
      type: DataTypes.INTEGER,
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

  Turma.associate = function (models) {
    Turma.hasMany(models.Horario, {
      foreignKey: {
        name: 'Turma',
        allowNull: false
      }
    })

    Turma.belongsToMany(models.Curso, {
      through: models.Vaga,
      foreignKey: 'Turma'
    })

    Turma.belongsToMany(models.Docente, {
      through: models.DocenteTurma,
      foreignKey: 'Turma'
    })
  }

  return Turma
}