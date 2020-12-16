'use strict'

module.exports = function (sequelize, DataTypes) {
    const GradeCursoExterno = sequelize.define('GradeCursoExterno', {
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
            through: models.DisciplinaGradeCursoExterno,
            foreignKey: 'Grade',
            onDelete: 'RESTRICT'
        })

    }

    return GradeCursoExterno
}