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

    Turma.associate = function (models) {
        Turma.belongsToMany(models.Curso, {
            through: models.Vaga,
            foreignKey: 'Turma',
            onDelete: 'RESTRICT'
        })

        Turma.belongsToMany(models.Curso, {
            through: models.Pedido,
            foreignKey: {
                name:'Turma',
                allowNull:false
            },
            onDelete:'CASCADE'
        })
    }

    return Turma
}