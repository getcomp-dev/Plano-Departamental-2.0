'use strict';
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models) {
        User.hasMany(models.File, {
          foreignKey: {
            name: 'user',
            allowNull: false
          },
          onDelete: 'CASCADE'
        });
        User.hasMany(models.Project, {
          foreignKey: {
            name: 'user',
            allowNull: false
          },
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return User;
};