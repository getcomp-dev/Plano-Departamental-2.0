'use strict';

var CustomError = require('../../infra/CustomError');
const FileType = require('../../enums/example/FileType');

module.exports = function (sequelize, DataTypes) {
  var File = sequelize.define('File', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: FileType.XML,
        max: FileType.FOLDER
      }
    },
    size: {
      type: DataTypes.DECIMAL(20, 3),
      allowNull: false,
      defaultValue: 0.0
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    excluded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function (models) {
        File.hasOne(models.File, {
          as: 'ParentFolder',
          foreignKey: {
            name: 'parent',
            allowNull: true,
            defaultValue: null,
            validate: {
              parentBelongsToUser: function (value, next) {
                if (!value) {
                  next();
                }
                var self = this;
                File.findOne({
                  where: {
                    id: value
                  }
                }).then(function (file) {
                  if (file && self.user === file.user && parseInt(file.type) === FileType.FOLDER) {
                    next();
                  } else {
                    next(new CustomError(404, 'Parent folder does not belong to user'));
                  }
                })
              }
            }
          },
          onDelete: 'CASCADE'
        });
        File.hasMany(models.Tag, {
          foreignKey: {
            name: 'file',
            allowNull: false
          },
          onDelete: 'CASCADE'
        });
        File.belongsToMany(models.Project, {
          through: 'ProjectFile',
          foreignKey: 'file',
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
        File.belongsToMany(models.Execution, {
          through: 'ExecutionFile',
          foreignKey: 'file',
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
        File.hasOne(models.Job, {
          as: 'inputFile1',
          foreignKey: {
            name: 'inputFile1',
            allowNull: true,
            defaultValue: null
          },
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
        File.hasOne(models.Job, {
          as: 'inputFile2',
          foreignKey: {
            name: 'inputFile2',
            allowNull: true,
            defaultValue: null
          },
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
        File.hasOne(models.Job, {
          as: 'outputFile1',
          foreignKey: {
            name: 'outputFile1',
            allowNull: true,
            defaultValue: null
          },
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
        File.hasOne(models.Job, {
          as: 'outputFile2',
          foreignKey: {
            name: 'outputFile2',
            allowNull: true,
            defaultValue: null
          },
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        });
      }
    }
  });
  return File;
};