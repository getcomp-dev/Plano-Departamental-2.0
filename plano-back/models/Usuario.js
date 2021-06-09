'use strict'

module.exports = function (sequelize, DataTypes) {
  const Usuario = sequelize.define('Usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Já existe um usuário com esse login'
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return Usuario
}