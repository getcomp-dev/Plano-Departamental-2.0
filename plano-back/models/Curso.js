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
    },

    alunosEntrada2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    posicao: {
      type: DataTypes.INTEGER
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

    Curso.hook('beforeCreate', (curso, options) => {
        curso.nome = curso.nome.toUpperCase();
        curso.codigo = curso.codigo.toUpperCase();
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
      onDelete: 'CASCADE'
    })

    Curso.belongsToMany(models.TurmaExterna, {
      through: models.PedidoExterno,
      foreignKey: {
          name:'Curso',
          allowNull: false
      },
      onDelete: 'CASCADE'
    })
  }

  return Curso
}