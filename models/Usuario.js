
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O nome não pode ser nulo.'
            },
            notEmpty: {
                msg: 'O nome é obrigatório.'
            },
            is: {
                args: /^[A-Za-zÀ-ÿ\s]+$/,
                msg: 'O nome deve conter apenas letras e espaços.'
            },
            len: {
                args: [2, 100],
                msg: 'O nome deve ter entre 2 e 100 caracteres.'
            }
        },
        set(valor) {
            this.setDataValue(
                'nome',
                typeof valor === 'string' ? valor.trim() : valor
            );
        }
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'O e-mail não pode ser nulo.'
            },
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
            this.setDataValue(
                'email',
                typeof valor === 'string' ? valor.trim().toLowerCase() : valor
            );
        }
    }
});

module.exports = Usuario;
