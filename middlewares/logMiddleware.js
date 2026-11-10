module.exports = (req, res, next) => {
    const dataHora = new Date().toLocaleString('pt-BR');
    console.log(`[${dataHora}] Nova requisição: ${req.method} ${req.url}`);
    next();
};