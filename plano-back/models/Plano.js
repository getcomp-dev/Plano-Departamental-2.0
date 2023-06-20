'use strict'

module.exports = function (sequelize, DataTypes) {
    const Plano =  sequelize.define('Plano', {
        ano: {
            type: DataTypes.INTEGER
        },
        nome: {
            type: DataTypes.STRING
        },
        obs: {
            type: DataTypes.STRING
        },
        isEditable: {
            type: DataTypes.BOOLEAN
        },
        visible: {
            type: DataTypes.BOOLEAN
        },
        anterior: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    Plano.associate = function (models) {
        Plano.hasMany(models.Turma, {
            foreignKey: {
                name: 'Plano',
                allowNull: true
            },
            onDelete: 'CASCADE'
        })

        Plano.hasMany(models.TurmaExterna, {
            foreignKey: {
                name: 'Plano',
                allowNull: true
            },
            onDelete: 'CASCADE'
        })

        Plano.hasMany(models.CargaPos, {
            foreignKey: {
                name: 'Plano',
                allowNull: true
            },
            onDelete: 'CASCADE'
        })
    }

        return Plano
}
