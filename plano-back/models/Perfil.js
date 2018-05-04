'use strict'

module.exports = function (sequelize, DataTypes) {
  const Perfil = sequelize.define('Perfil', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O nome não deve estar vazio'
        }
      }
    },
    abreviacao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'A abreviação não deve estar vazia'
        }
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

  Perfil.associate = function (models) {
    Perfil.hasMany(models.Disciplina, {
      foreignKey: {
        name: 'Perfil',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    })

    Perfil.belongsToMany(models.Docente, {
      through: models.DocentePerfil,
      foreignKey: 'Perfil',
      onDelete: 'RESTRICT'
    })
  }

  return Perfil
}