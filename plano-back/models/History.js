'use strict'

module.exports = function (sequelize, DataTypes) {
    const History = sequelize.define('History', {
        tabelaModificada: {
            type: DataTypes.STRING,
            allowNull: false
        },

        campoModificado: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },

        linhaModificada: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },

        valorAnterior: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },

        valorNovo:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },

        tipoOperacao: {
            type: DataTypes.STRING,
            allowNull: false
        },

        usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },


    }, {
        freezeTableName: true,
        timestamps: true
    })

    return History
}