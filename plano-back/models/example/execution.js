'use strict';

const ExecutionStatus = require('../../enums/example/ExecutionStatus'),
      ExecutionType   = require('../../enums/example/ExecutionType');

module.exports = function (sequelize, DataTypes) {
  var Execution = sequelize.define('Execution', {
    contextKey: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: ExecutionType.INFERENCIA_CHAVE_CONTEXTO,
        max: ExecutionType.INFERENCIA_SIMILARIDADE
      }
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: ExecutionStatus.QUEUED,
      validate: {
        min: ExecutionStatus.QUEUED,
        max: ExecutionStatus.ERROR
      }
    },
    prologRule: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models) {
        Execution.hasMany(models.Job, {
          foreignKey: 'execution',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
        Execution.belongsToMany(models.File, {
          through: 'ExecutionFile',
          foreignKey: 'execution',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
        Execution.belongsTo(models.Project, {
          foreignKey: 'project',
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
      }
    }
  });

  return Execution;
};