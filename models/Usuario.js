
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome é obrigatório.'
            },
            notNull: {
                msg: 'O nome não pode ser nulo.'
            },
            len: {
                args: [2, 100],
                msg: 'O nome deve ter entre 2 e 100 caracteres.'
            }
        },
        set(valor) {
            this.setDataValue('nome', valor.trim());
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
            },
            len: {
                args: [5, 150],
                msg: 'O e-mail deve ter entre 5 e 150 caracteres.'
            }
        },
        set(valor) {
            this.setDataValue('email', valor.trim().toLowerCase());
        }
    }
});

module.exports = Usuario;
