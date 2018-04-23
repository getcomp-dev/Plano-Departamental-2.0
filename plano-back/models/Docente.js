'use strict';

module.exports = function (sequelize, DataTypes) {
    const Docente = sequelize.define('Docente', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        creditos: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Docente.associate = function (models) {
        Docente.hasMany(models.Turma, {
            foreignKey: {
                name: 'docente',
                allowNull: false
            }
        });

        Docente.belongsToMany(models.Perfil, {
            through: models.DocentePerfil,
            foreignKey: 'docente'
        });
    };

    return Docente;
};