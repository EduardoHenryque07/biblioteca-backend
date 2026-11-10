const { Emprestimo, Usuario, Livro } = require('../models');
const registrarErro = require('../utils/logger');

exports.cadastrarEmprestimo = async (req, res) => {
    try {
        const { usuarioId, livroId, dataEmprestimo, dataDevolucao } = req.body;
        if (!Number.isInteger(Number(usuarioId)) || Number(usuarioId) <= 0 || !Number.isInteger(Number(livroId)) || Number(livroId) <= 0) {
            return res.status(400).json({ erro: 'Informe IDs de usuário e livro válidos.' });
        }
        
        const usuario = await Usuario.findByPk(usuarioId);
        const livro = await Livro.findByPk(livroId);

        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
        if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });
        if (!livro.disponivel) return res.status(400).json({ erro: 'Este livro não está disponível para empréstimo.' });

        const emprestimo = await Emprestimo.create({ usuarioId, livroId, dataEmprestimo, dataDevolucao });
        await livro.update({ disponivel: false });

        return res.status(201).json(emprestimo);
    } catch (erro) {
        registrarErro(erro, 'Erro ao cadastrar empréstimo');
        return res.status(400).json({ erro: 'Erro ao cadastrar empréstimo.', detalhe: erro.message });
    }
};

exports.listarEmprestimos = async (req, res) => {
    try {
        const emprestimos = await Emprestimo.findAll({ include: [{ model: Usuario }, { model: Livro }] });
        return res.json(emprestimos);
    } catch (erro) {
        registrarErro(erro, 'Erro ao listar empréstimos');
        return res.status(500).json({ erro: 'Erro ao listar empréstimos.', detalhe: erro.message });
    }
};

exports.buscarEmprestimoPorId = async (req, res) => {
    try {
        const emprestimo = await Emprestimo.findByPk(req.params.id, { include: [{ model: Usuario }, { model: Livro }] });
        if (!emprestimo) return res.status(404).json({ erro: 'Empréstimo não encontrado.' });
        return res.json(emprestimo);
    } catch (erro) {
        registrarErro(erro, 'Erro ao buscar empréstimo');
        return res.status(500).json({ erro: 'Erro ao buscar empréstimo.', detalhe: erro.message });
    }
};

exports.atualizarEmprestimo = async (req, res) => {
    try {
        const emprestimo = await Emprestimo.findByPk(req.params.id);
        if (!emprestimo) return res.status(404).json({ erro: 'Empréstimo não encontrado.' });

        const { dataEmprestimo, dataDevolucao } = req.body;
        const dadosAtualizacao = {};
        if (dataEmprestimo !== undefined) dadosAtualizacao.dataEmprestimo = dataEmprestimo;
        if (dataDevolucao !== undefined) dadosAtualizacao.dataDevolucao = dataDevolucao;

        await emprestimo.update(dadosAtualizacao);

        const outroEmprestimoAtivo = await Emprestimo.findOne({ where: { livroId: emprestimo.livroId, dataDevolucao: null } });
        const livro = await Livro.findByPk(emprestimo.livroId);
        if (livro) await livro.update({ disponivel: !outroEmprestimoAtivo });

        return res.json({ mensagem: 'Empréstimo atualizado com sucesso.', emprestimo });
    } catch (erro) {
        registrarErro(erro, 'Erro ao atualizar empréstimo');
        return res.status(400).json({ erro: 'Erro ao atualizar empréstimo.', detalhe: erro.message });
    }
};

exports.excluirEmprestimo = async (req, res) => {
    try {
        const emprestimo = await Emprestimo.findByPk(req.params.id);
        if (!emprestimo) return res.status(404).json({ erro: 'Empréstimo não encontrado.' });

        const livroId = emprestimo.livroId;
        const precisaLiberarLivro = !emprestimo.dataDevolucao;
        await emprestimo.destroy();

        if (precisaLiberarLivro) {
            const outroEmprestimoAtivo = await Emprestimo.findOne({ where: { livroId: livroId, dataDevolucao: null } });
            if (!outroEmprestimoAtivo) {
                const livro = await Livro.findByPk(livroId);
                if (livro) await livro.update({ disponivel: true });
            }
        }
        return res.json({ mensagem: 'Empréstimo excluído com sucesso.' });
    } catch (erro) {
        registrarErro(erro, 'Erro ao excluir empréstimo');
        return res.status(500).json({ erro: 'Erro ao excluir empréstimo.', detalhe: erro.message });
    }
};