'use strict'

module.exports = function (sequelize, DataTypes) {
  const Turma = sequelize.define('Turma', {
    periodo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    letra: {
      type: DataTypes.STRING,
      allowNull: true
    },
    turno1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    turno2: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
      freezeTableName: true,
      timestamps: false,
      indexes:[
          {
            unique:true,
            fields:['letra', 'periodo', 'Disciplina']
          }
      ]
  })

  Turma.hook('beforeCreate', (turma, options) => {
    turma.letra = turma.letra.toUpperCase();
  });

  Turma.associate = function (models) {
    Turma.belongsToMany(models.Curso, {
      through: models.Vaga,
      foreignKey: {
        name:'Turma',
        allowNull:true},
      onDelete: 'RESTRICT'
    })

    Turma.belongsToMany(models.Curso, {
      through: models.Pedido,
      foreignKey: {
        name:'Turma',
        allowNull:true
      },
      onDelete:'CASCADE'
    })
  }

  return Turma
}