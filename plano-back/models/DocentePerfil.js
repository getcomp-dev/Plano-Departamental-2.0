'use strict';

module.exports = function (sequelize, DataTypes) {
    const DocentePerfil = sequelize.define('DocentePerfil', {
        afinidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return DocentePerfil;
};