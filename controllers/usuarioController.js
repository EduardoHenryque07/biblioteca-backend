const { Usuario } = require('../models');
const registrarErro = require('../utils/logger');

exports.cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email } = req.body;
        if (typeof nome !== 'string' || nome.trim() === '' || typeof email !== 'string' || email.trim() === '') {
            return res.status(400).json({ erro: 'Nome e email são obrigatórios e devem ser válidos.' });
        }
        const usuario = await Usuario.create({ nome, email });
        return res.status(201).json(usuario);
    } catch (erro) {
        registrarErro(erro, 'Erro ao cadastrar usuário');
        return res.status(500).json({ erro: 'Erro ao cadastrar usuário.', detalhe: erro.message });
    }
};

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        return res.status(200).json(usuarios);
    } catch (erro) {
        registrarErro(erro, 'Erro ao listar usuários');
        return res.status(500).json({ erro: 'Erro ao listar usuários.', detalhe: erro.message });
    }
};

exports.buscarUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
        return res.status(200).json(usuario);
    } catch (erro) {
        registrarErro(erro, 'Erro ao buscar usuário');
        return res.status(500).json({ erro: 'Erro ao buscar usuário.', detalhe: erro.message });
    }
};

exports.atualizarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });

        const { nome, email } = req.body;
        const dadosAtualizacao = {};
        if (nome !== undefined) dadosAtualizacao.nome = nome;
        if (email !== undefined) dadosAtualizacao.email = email;

        if (Object.keys(dadosAtualizacao).length === 0) {
            return res.status(400).json({ erro: 'Informe pelo menos um campo para atualizar.' });
        }

        await usuario.update(dadosAtualizacao);
        return res.status(200).json(usuario);
    } catch (erro) {
        registrarErro(erro, 'Erro ao atualizar usuário');
        return res.status(500).json({ erro: 'Erro ao atualizar usuário.', detalhe: erro.message });
    }
};

exports.excluirUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });

        await usuario.destroy();
        return res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' });
    } catch (erro) {
        registrarErro(erro, 'Erro ao excluir usuário');
        return res.status(500).json({ erro: 'Erro ao excluir usuário.', detalhe: erro.message });
    }
};