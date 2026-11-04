
const fs = require('fs');
const path = require('path');

const pastaLogs = path.join(__dirname, '..', 'logs');
const arquivoLog = path.join(pastaLogs, 'errors.log');

function registrarErro(erro, contexto = 'Erro na aplicação') {
    if (!fs.existsSync(pastaLogs)) {
        fs.mkdirSync(pastaLogs, { recursive: true });
    }

    const mensagem = [
        `[${new Date().toISOString()}]`,
        `Contexto: ${contexto}`,
        `Erro: ${erro.message || erro}`,
        '----------------------------------------',
        ''
    ].join('\n');

    fs.appendFile(arquivoLog, mensagem, (falha) => {
        if (falha) {
            console.error('Não foi possível registrar o erro:', falha);
        }
    });
}

module.exports = registrarErro;
