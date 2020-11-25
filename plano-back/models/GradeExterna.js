'use strict'

module.exports = function (sequelize, DataTypes) {
    const GradeExterna = sequelize.define('GradeExterna', {
        periodoInicio: {
            type: DataTypes.STRING,
            allowNull: false
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    GradeExterna.associate = function (models) {

        GradeExterna.belongsToMany(models.Disciplina, {
            through: models.DisciplinaGradeExterna,
            foreignKey: 'Grade',
            onDelete: 'RESTRICT'
        })

    }

    return GradeExterna
}