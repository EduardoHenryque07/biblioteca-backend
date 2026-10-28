const mongoose = require('mongoose');
require('dotenv').config();

async function conectarMongo() {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB conectado com sucesso!');
}

module.exports = conectarMongo;