'use strict';
module.exports = function (sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rootElement: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    eachElement: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  }, {
    classMethods: {
      associate: function (models) {
        Project.belongsToMany(models.File, {
          through: 'ProjectFile',
          foreignKey: 'project',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
        Project.hasMany(models.Rule, {
          foreignKey: {
            name: 'project',
            allowNull: false
          },
          onDelete: 'CASCADE'
        });
        Project.hasMany(models.Tag, {
          foreignKey: {
            name: 'project',
            allowNull: false
          },
          onDelete: 'CASCADE'
        });
        Project.hasMany(models.Execution, {
          foreignKey: 'project'
        });
      }
    }
  });
  return Project;
};