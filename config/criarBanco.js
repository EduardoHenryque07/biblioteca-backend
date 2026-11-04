
const { Client } = require('pg');
require('dotenv').config();

async function criarBanco() {
    const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'postgres'
    });

    try {
        await client.connect();

        const resultado = await client.query(
            'SELECT 1 FROM pg_database WHERE datname = $1',
            [process.env.DB_NAME]
        );

        if (resultado.rowCount === 0) {
            const nomeBanco = process.env.DB_NAME;

            // O nome do banco vem da configuração local.
            await client.query(`CREATE DATABASE "${nomeBanco}"`);

            console.log(`Banco ${nomeBanco} criado com sucesso!`);
        } else {
            console.log('Banco de dados já existe!');
        }
    } catch (erro) {
        console.error('Erro ao criar banco de dados:', erro.message);
        throw erro;
    } finally {
        await client.end();
    }
}

module.exports = criarBanco;
