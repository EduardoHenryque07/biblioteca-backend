const { Op } = require('sequelize');
const { Livro, Emprestimo } = require('../models');
const registrarErro = require('../utils/logger');

// LISTAR LIVROS
exports.listarLivros = async (req, res) => {
    try {
        const { titulo, autor, disponivel, ordenar } = req.query;
        const where = {};

        if (titulo) where.titulo = { [Op.iLike]: `%${titulo}%` };
        if (autor) where.autor = { [Op.iLike]: `%${autor}%` };
        if (disponivel !== undefined) where.disponivel = disponivel === 'true';

        let order = [['id', 'ASC']];
        if (ordenar === 'titulo') order = [['titulo', 'ASC']];
        else if (ordenar === 'titulo_desc') order = [['titulo', 'DESC']];
        else if (ordenar === 'ano') order = [['anoPublicacao', 'ASC']];
        else if (ordenar === 'ano_desc') order = [['anoPublicacao', 'DESC']];

        const livros = await Livro.findAll({ where, order });
        return res.json(livros);

    } catch (erro) {
        registrarErro(erro, 'Erro ao listar livros');
        return res.status(500).json({ erro: 'Erro ao listar livros.', detalhe: erro.message });
    }
};

// BUSCAR POR ID
exports.buscarLivroPorId = async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);
        if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });
        return res.json(livro);
    } catch (erro) {
        registrarErro(erro, 'Erro ao buscar livro');
        return res.status(500).json({ erro: 'Erro ao buscar livro.', detalhe: erro.message });
    }
};

// CADASTRAR LIVRO
exports.cadastrarLivro = async (req, res) => {
    try {
        const { titulo, autor, anoPublicacao, disponivel } = req.body;
        const livro = await Livro.create({ titulo, autor, anoPublicacao, disponivel });
        return res.status(201).json({ mensagem: 'Livro cadastrado com sucesso!', livro });
    } catch (erro) {
        registrarErro(erro, 'Erro ao cadastrar livro');
        return res.status(400).json({ erro: 'Erro ao cadastrar livro.', detalhe: erro.message });
    }
};

// ATUALIZAR LIVRO
exports.atualizarLivro = async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);
        if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });

        const { titulo, autor, anoPublicacao, disponivel } = req.body;
        const dadosAtualizacao = {};

        if (titulo !== undefined) dadosAtualizacao.titulo = titulo;
        if (autor !== undefined) dadosAtualizacao.autor = autor;
        if (anoPublicacao !== undefined) dadosAtualizacao.anoPublicacao = anoPublicacao;
        if (disponivel !== undefined) dadosAtualizacao.disponivel = disponivel;

        if (disponivel !== undefined && disponivel !== livro.disponivel) {
            const emprestimoAtivo = await Emprestimo.findOne({
                where: { livroId: livro.id, dataDevolucao: null }
            });
            if (emprestimoAtivo) {
                return res.status(400).json({ erro: 'A disponibilidade deste livro é controlada pelos empréstimos.' });
            }
        }

        await livro.update(dadosAtualizacao);
        return res.json({ mensagem: 'Livro atualizado com sucesso!', livro });
    } catch (erro) {
        registrarErro(erro, 'Erro ao atualizar livro');
        return res.status(400).json({ erro: 'Erro ao atualizar livro.', detalhe: erro.message });
    }
};

// EXCLUIR LIVRO
exports.excluirLivro = async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);
        if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });

        const possuiEmprestimos = await Emprestimo.findOne({ where: { livroId: livro.id } });
        if (possuiEmprestimos) {
            return res.status(400).json({ erro: 'Não é possível excluir livro com empréstimos.' });
        }

        await livro.destroy();
        return res.json({ mensagem: 'Livro excluído com sucesso!' });
    } catch (erro) {
        registrarErro(erro, 'Erro ao excluir livro');
        return res.status(500).json({ erro: 'Erro ao excluir livro.', detalhe: erro.message });
    }
};