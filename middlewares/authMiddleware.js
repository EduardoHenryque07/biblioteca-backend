module.exports = (req, res, next) => {
    // Verifica se a sessão existe e se há um utilizador logado
    if (req.session && req.session.usuarioLogado) {
        return next(); // Tem permissão, avança para a rota
    }
    
    // Se não estiver logado, redireciona para a página de login ou devolve erro
    // (Como vamos usar Views na Etapa 6, o ideal será redirecionar: res.redirect('/login'))
    return res.status(401).json({ erro: 'Acesso negado. Faça login para continuar.' });
};