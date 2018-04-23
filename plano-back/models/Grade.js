'use strict';

module.exports = function (sequelize, DataTypes) {
    const Grade = sequelize.define('Grade', {
        periodoInicio: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Grade.associate = function (models) {

        Grade.belongsToMany(models.Disciplina, {
            through: models.DisciplinaGrade,
            foreignKey: 'grade'
        });

    };

    return Grade;
};