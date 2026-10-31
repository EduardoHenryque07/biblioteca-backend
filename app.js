const express = require('express');
require('dotenv').config();

const sequelize = require('./config/database');
const conectarMongo = require('./config/mongo');

const app = express();

app.use(express.json());

const avaliacaoRoutes = require('./routes/avaliacaoRoutes');

app.use('/avaliacoes', avaliacaoRoutes);

const emprestimoRoutes = require('./routes/emprestimoRoutes');

app.use('/emprestimos', emprestimoRoutes);

const livroRoutes = require('./routes/livroRoutes');

app.use('/livros', livroRoutes);

const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/usuarios', usuarioRoutes);

const { Usuario, Livro, Emprestimo } = require('./models');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API da Biblioteca funcionando!',
        status: 'OK'
    });
});

async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Tabelas do PostgreSQL sincronizadas!');
        console.log('PostgreSQL conectado com sucesso!');

        await conectarMongo();

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
            console.log(`Servidor rodando em http://localhost:${PORT}/usuarios`);
        });

    } catch (erro) {
        console.error('Erro ao iniciar a aplicação:', erro);
    }
}

iniciarServidor();