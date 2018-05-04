'use strict'

module.exports = function (sequelize, DataTypes) {
  const Docente = sequelize.define('Docente', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creditos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

  Docente.associate = function (models) {
    Docente.belongsToMany(models.Turma, {
      through: models.DocenteTurma,
      foreignKey: 'Docente',
      onDelete: 'RESTRICT'
    })

    Docente.belongsToMany(models.Perfil, {
      through: models.DocentePerfil,
      foreignKey: 'Docente',
      onDelete: 'RESTRICT'
    })
  }

  return Docente
}