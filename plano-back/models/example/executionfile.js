'use strict';

module.exports = function (sequelize, DataTypes) {
  var ExecutionFile = sequelize.define('ExecutionFile', {}, {});

  return ExecutionFile;
};