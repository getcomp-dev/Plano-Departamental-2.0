'use strict';

const JobType   = require('../../enums/example/JobType');
const JobStatus = require('../../enums/example/JobStatus');

module.exports = function (sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    arguments: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: JobType.PHOENIX,
        max: JobType.INFERIR_REGRAS
      }
    },
    output: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: JobStatus.QUEUED,
      validate: {
        min: JobStatus.QUEUED,
        max: JobStatus.ERROR
      }
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models) {
        Job.belongsTo(models.Execution, {
          foreignKey: 'execution',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      }
    }
  });

  return Job;
};