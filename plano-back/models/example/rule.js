'use strict';

module.exports = function (sequelize, DataTypes) {
  var Rule = sequelize.define('Rule', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    output: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models) {
        Rule.hasMany(models.Condition, {
          foreignKey: 'rule',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      }
    }
  });
  return Rule;
};