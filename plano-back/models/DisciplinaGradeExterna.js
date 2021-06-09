'use strict'

module.exports = function (sequelize, DataTypes) {
    const DisciplinaGradeExterna = sequelize.define('DisciplinaGradeExterna', {
        periodo: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return DisciplinaGradeExterna
}