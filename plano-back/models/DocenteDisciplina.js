'use strict'

module.exports = function (sequelize, DataTypes) {
    const DocenteDisciplina = sequelize.define('DocenteDisciplina', {
        preferencia: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return DocenteDisciplina
}