
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Emprestimo = sequelize.define('Emprestimo', {
    dataEmprestimo: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            notNull: {
                msg: 'A data do empréstimo é obrigatória.'
            },
            isDate: {
                msg: 'Informe uma data de empréstimo válida.'
            }
        }
    },

    dataDevolucao: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: {
                msg: 'Informe uma data de devolução válida.'
            },

            isAfterOrEqualDataEmprestimo(valor) {
                if (
                    valor &&
                    this.dataEmprestimo &&
                    valor < this.dataEmprestimo
                ) {
                    throw new Error(
                        'A devolução não pode ser anterior ao empréstimo.'
                    );
                }
            }
        }
    }
});

module.exports = Emprestimo;
