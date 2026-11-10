// Para simplificar, vamos assumir que o login verifica apenas um utilizador base de dados ou um admin fixo.
// Terá de adaptar à sua regra de negócio de utilizadores.

exports.login = async (req, res) => {
    const { email, senha } = req.body;
    
    // Exemplo estático para testes (deverá validar no banco de dados)
    if (email === 'admin@biblioteca.com' && senha === '123456') {
        // Guarda a informação do utilizador na sessão
        req.session.usuarioLogado = { email, perfil: 'admin' };
        
        return res.json({ mensagem: 'Login com sucesso!' }); 
        // Na etapa 6 será: return res.redirect('/dashboard');
    }
    
    return res.status(401).json({ erro: 'Credenciais inválidas.' });
};

exports.logout = (req, res) => {
    req.session.destroy((erro) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao fazer logout.' });
        }
        res.clearCookie('connect.sid'); // Limpa o cookie da sessão
        return res.json({ mensagem: 'Sessão encerrada com sucesso.' });
        // Na etapa 6 será: res.redirect('/login');
    });
};