'use strict';

module.exports = function (sequelize, DataTypes) {
  var Condition = sequelize.define('Condition', {
    first: {
      type: DataTypes.STRING,
      allowNull: false
    },
    relationship: {
      type: DataTypes.ENUM('>', '<', '>=', '<=', '!=', '=='),
      defaultValue: '>'
    },
    second: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  }, {});

  return Condition;
};