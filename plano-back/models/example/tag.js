'use strict';
module.exports = function (sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  return Tag;
};