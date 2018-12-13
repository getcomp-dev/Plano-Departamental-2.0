'use strict'

module.exports = function (sequelize, DataTypes) {
    const TurmaExterna = sequelize.define('TurmaExterna', {
        periodo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        letra: {
            type: DataTypes.STRING,
            allowNull: false
        },
        turno1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        turno2: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    TurmaExterna.associate = function (models) {
        TurmaExterna.belongsToMany(models.Curso, {
            through: models.Vaga,
            foreignKey: 'Turma',
            onDelete: 'RESTRICT'
        })

        TurmaExterna.belongsToMany(models.Curso, {
            through: models.PedidoExterno,
            foreignKey: {
                name:'Turma',
                allowNull:false
            },
            onDelete:'CASCADE'
        })
    }

    return TurmaExterna
}