
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Livro = sequelize.define('Livro', {
    titulo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O título é obrigatório.'
            }
        }
    },
    autor: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O autor é obrigatório.'
            }
        }
    },
    anoPublicacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: new Date().getFullYear()
        }
    },
    disponivel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Livro;
