'use strict'

module.exports = function (sequelize, DataTypes) {
    const DisciplinaGradeCursoExterno = sequelize.define('DisciplinaGradeCursoExterno', {
        periodo: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return DisciplinaGradeCursoExterno
}