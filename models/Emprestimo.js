
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Emprestimo = sequelize.define('Emprestimo', {
    dataEmprestimo: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    dataDevolucao: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
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
