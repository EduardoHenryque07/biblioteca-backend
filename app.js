const express = require('express');
require('dotenv').config();

const sequelize = require('./config/database');
const conectarMongo = require('./config/mongo');

const app = express();

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
        });

    } catch (erro) {
        console.error('Erro ao iniciar a aplicação:', erro.message);
    }
}

iniciarServidor();