
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome é obrigatório.'
            }
        }
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'O e-mail é obrigatório.'
            },
            isEmail: {
                msg: 'Informe um e-mail válido.'
            }
        }
    }
});

module.exports = Usuario;
