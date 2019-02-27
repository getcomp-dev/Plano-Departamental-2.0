'use strict'

module.exports = function (sequelize, DataTypes) {
  const Docente = sequelize.define('Docente', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apelido: {
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

  Docente.hook('beforeCreate', (docente, options) => {
      docente.nome = docente.nome.toUpperCase();
      docente.apelido = docente.apelido.toUpperCase();
  });

  Docente.associate = function (models) {
    Docente.hasMany(models.Turma, {
      foreignKey: {
        name: 'Docente1',
        allowNull:true
      },
      onDelete: 'RESTRICT'
    })

    Docente.hasMany(models.Turma, {
        foreignKey: {
          name: 'Docente2',
          allowNull:true
        },
        onDelete: 'RESTRICT'
    })

    Docente.hasMany(models.CargaPos, {
      foreignKey: {
        name: 'Docente',
        allowNull:true
      },
      onDelete: 'RESTRICT'
    })
  }

  return Docente
}