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

    Grade.associate = function (models) {

        Grade.belongsToMany(models.Disciplina, {
            through: models.DisciplinaGradeExterna,
            foreignKey: 'Grade',
            onDelete: 'RESTRICT'
        })

    }

    return GradeExterna
}