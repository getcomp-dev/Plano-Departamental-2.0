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
    },
    ead: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    laboratorio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1
    },
  }, {
    freezeTableName: true,
    timestamps: false
  })

  Disciplina.hook('beforeCreate', (disciplina, options) => {
      disciplina.nome = disciplina.nome.toUpperCase();
      disciplina.codigo = disciplina.codigo.toUpperCase();
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

    Disciplina.belongsToMany(models.GradeCursoExterno, {
      through: models.DisciplinaGradeCursoExterno,
      foreignKey: 'Disciplina',
      onDelete: 'RESTRICT'
    })

    Disciplina.belongsToMany(models.GradeExterna, {
      through: models.DisciplinaGradeExterna,
      foreignKey: 'Disciplina',
      onDelete: 'RESTRICT'
    })

    Disciplina.belongsToMany(models.Docente, {
      through: models.DocenteDisciplina,
      foreignKey: 'Disciplina',
      onDelete: 'RESTRICT'
    })
  }

  return Disciplina
}