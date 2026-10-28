
const Usuario = require('./Usuario');
const Livro = require('./Livro');
const Emprestimo = require('./Emprestimo');

Usuario.hasMany(Emprestimo, {
    foreignKey: {
        name: 'usuarioId',
        allowNull: false
    },
    onDelete: 'RESTRICT'
});

Emprestimo.belongsTo(Usuario, {
    foreignKey: 'usuarioId'
});

Livro.hasMany(Emprestimo, {
    foreignKey: {
        name: 'livroId',
        allowNull: false
    },
    onDelete: 'RESTRICT'
});

Emprestimo.belongsTo(Livro, {
    foreignKey: 'livroId'
});

module.exports = {
    Usuario,
    Livro,
    Emprestimo
};

