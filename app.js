
const path = require('path');
const express = require('express');
require('dotenv').config();

const criarBanco = require('./config/criarBanco');
const sequelize = require('./config/database');
const conectarMongo = require('./config/mongo');
const registrarErro = require('./utils/logger');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Permite receber dados em JSON
app.use(express.json());

// Importação das rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const livroRoutes = require('./routes/livroRoutes');
const emprestimoRoutes = require('./routes/emprestimoRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');

// Registro das rotas
app.use('/usuarios', usuarioRoutes);
app.use('/livros', livroRoutes);
app.use('/emprestimos', emprestimoRoutes);
app.use('/avaliacoes', avaliacaoRoutes);

// Tratamento de rotas não encontradas
app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada.'
    });
});

// Tratamento geral de erros
app.use((erro, req, res, next) => {
    registrarErro(
        erro,
        `Erro na rota ${req.method} ${req.originalUrl}`
    );

    console.error('Erro na aplicação:', erro);

    res.status(500).json({
        erro: 'Erro interno do servidor.'
    });
});

// Inicialização do servidor
async function iniciarServidor() {
    try {
        // Verifica se o banco existe e cria caso necessário
        await criarBanco();

        // Conecta ao PostgreSQL
        await sequelize.authenticate();

        // Cria as tabelas conforme os modelos
        await sequelize.sync();

        console.log('Tabelas do PostgreSQL sincronizadas!');
        console.log('PostgreSQL conectado com sucesso!');

        // Conecta ao MongoDB
        await conectarMongo();

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });

    } catch (erro) {
        registrarErro(erro, 'Erro ao iniciar a aplicação');

        console.error(
            'Erro ao iniciar a aplicação:',
            erro
        );
        process.exit(1);
    }
}

iniciarServidor();
