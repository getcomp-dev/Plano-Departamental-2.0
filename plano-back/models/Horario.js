'use strict'

module.exports = function (sequelize, DataTypes) {
    const Horario = sequelize.define('Horario', {
        horario: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    Horario.associate = function (models) {
        Horario.hasMany(models.Turma, {
            foreignKey: {
                name: 'Horario1',
                allowNull: true
            },
            onDelete: 'RESTRICT'
        })

        Horario.hasMany(models.Turma, {
            foreignKey: {
                name: 'Horario2',
                allowNull: true
            },
            onDelete: 'RESTRICT'
        })

        Horario.hasMany(models.TurmaExterna, {
            foreignKey: {
                name: 'Horario1',
                allowNull: true
            },
            onDelete: 'RESTRICT'
        })

        Horario.hasMany(models.TurmaExterna, {
            foreignKey: {
                name: 'Horario2',
                allowNull: true
            },
            onDelete: 'RESTRICT'
        })
    }

    return Horario
}