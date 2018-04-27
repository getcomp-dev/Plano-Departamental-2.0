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
    Sala.hasMany(models.Horario, {
      foreignKey: {
        name: 'Sala',
        allowNull: false
      }
    })
  }

  return Sala
}