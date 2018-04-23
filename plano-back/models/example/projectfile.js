'use strict';

module.exports = function (sequelize) {
  var ProjectFile = sequelize.define('ProjectFile', {}, {});

  return ProjectFile;
};