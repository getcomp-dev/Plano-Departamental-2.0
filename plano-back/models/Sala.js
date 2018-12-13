'use strict'

module.exports = function (sequelize, DataTypes) {
  const Sala = sequelize.define('Sala', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laboratorio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

  Sala.associate = function (models) {
    Sala.hasMany(models.Turma, {
      foreignKey: {
        name: 'Sala1',
        allowNull: true
      },
      onDelete: 'RESTRICT'
    })

    Sala.hasMany(models.Turma, {
      foreignKey: {
          name: 'Sala2',
          allowNull: true
      },
      onDelete: 'RESTRICT'
    })

    Sala.hasMany(models.TurmaExterna, {
      foreignKey: {
          name: 'Sala1',
          allowNull: true
      },
      onDelete: 'RESTRICT'
    })

    Sala.hasMany(models.TurmaExterna, {
      foreignKey: {
          name: 'Sala2',
          allowNull: true
      },
      onDelete: 'RESTRICT'
    })

  }

  return Sala
}