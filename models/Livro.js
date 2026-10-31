
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Livro = sequelize.define('Livro', {
    titulo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O título é obrigatório.'
            },
            len: {
                args: [2, 150],
                msg: 'O título deve ter entre 2 e 150 caracteres.'
            }
        },
        set(valor) {
            this.setDataValue('titulo', valor.trim());
        }
    },

    autor: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O autor é obrigatório.'
            },
            len: {
                args: [2, 100],
                msg: 'O autor deve ter entre 2 e 100 caracteres.'
            }
        },
        set(valor) {
            this.setDataValue('autor', valor.trim());
        }
    },

    anoPublicacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'O ano de publicação deve ser um número inteiro.'
            },
            min: {
                args: [1],
                msg: 'O ano de publicação deve ser maior que zero.'
            },
            max: {
                args: [new Date().getFullYear()],
                msg: 'O ano de publicação não pode ser futuro.'
            }
        }
    },

    disponivel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Livro;
