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
      type: DataTypes.FLOAT,
      allowNull: false
    },
    cargaPratica: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

  Disciplina.hook('beforeCreate', (disciplina, options) => {
      disciplina.nome = disciplina.nome.toLowerCase();
      disciplina.nome = disciplina.nome.charAt(0).toUpperCase() + disciplina.nome.slice(1);
      disciplina.nome = disciplina.nome.replace(/\s./g, function(txt){
          return txt.toUpperCase();
      })
  });

  Disciplina.associate = function (models) {
    Disciplina.hasMany(models.Turma, {
      foreignKey: {
        name: 'Disciplina',
        allowNull: true
      },
      onDelete: 'RESTRICT'
    })

    Disciplina.hasMany(models.TurmaExterna, {
        foreignKey: {
            name: 'Disciplina',
            allowNull: true
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