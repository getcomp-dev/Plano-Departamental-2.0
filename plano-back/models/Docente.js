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
      docente.nome = docente.nome.toLowerCase();
      docente.nome = docente.nome.charAt(0).toUpperCase() + docente.nome.slice(1);
      docente.nome = docente.nome.replace(/\s./g, function(txt){
          return txt.toUpperCase();
      })
      docente.apelido = docente.apelido.toLowerCase();
      docente.apelido = docente.apelido.charAt(0).toUpperCase() + docente.apelido.slice(1);
      docente.apelido = docente.apelido.replace(/\s./g, function(txt){
          return txt.toUpperCase();
      })
  });

  Docente.associate = function (models) {
    Docente.hasMany(models.Turma, {
      foreignKey: {
        name: 'Docente1',
        allowNull:false
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
  }

  return Docente
}