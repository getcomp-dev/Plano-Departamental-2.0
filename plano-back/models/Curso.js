'use strict'

module.exports = function (sequelize, DataTypes) {
  const Curso = sequelize.define('Curso', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {msg: 'O nome não deve estar vazio'}
      }
    },
    codigo: {
      type: DataTypes.STRING,
      unique: {msg: 'Já existe um Curso com esse código'},
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {msg: 'O codigo não deve estar vazio'}
      }
    },
    turno: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {msg: 'O turno não deve estar vazio'}
      }
    },

    semestreInicial: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    alunosEntrada: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

    Curso.hook('beforeCreate', (curso, options) => {
        curso.nome = curso.nome.toLowerCase();
        curso.nome = curso.nome.charAt(0).toUpperCase() + curso.nome.slice(1);
        curso.nome = curso.nome.replace(/\s./g, function(txt){
          return txt.toUpperCase();
        })
    });

  Curso.associate = function (models) {
    Curso.hasMany(models.Grade, {
      foreignKey: {
        name: 'Curso',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    })

    Curso.belongsToMany(models.Turma, {
      through: models.Vaga,
      foreignKey: 'Curso',
      onDelete: 'RESTRICT'
    })

    Curso.belongsToMany(models.Turma, {
      through: models.Pedido,
      foreignKey: {
        name:'Curso',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    })
  }

  return Curso
}