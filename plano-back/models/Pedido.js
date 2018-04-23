'use strict';

module.exports = function (sequelize, DataTypes) {
    const Pedido = sequelize.define('Pedido', {
        departamento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        responsavel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        vagasPeriodizadasSolicitadas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vagasNaoPeriodizadasSolicitadas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vagasPeriodizadasAtendidas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        vagasNaoPeriodizadasAtendidas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        freezeTableName: true
    });
    return Pedido;
};