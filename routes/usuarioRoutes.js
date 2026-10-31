
const express = require('express');
const router = express.Router();

const { Usuario } = require('../models');

// CADASTRAR USUÁRIO
router.post('/', async (req, res) => {
    try {
        const { nome, email } = req.body;

        if (!nome || !email) {
            return res.status(400).json({
                erro: 'Nome e email são obrigatórios.'
            });
        }

        const usuario = await Usuario.create({
            nome,
            email
        });

        return res.status(201).json(usuario);

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao cadastrar usuário.',
            detalhe: erro.message
        });
    }
});

// LISTAR USUÁRIOS
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();

        return res.status(200).json(usuarios);

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao listar usuários.',
            detalhe: erro.message
        });
    }
});

// BUSCAR USUÁRIO POR ID
router.get('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não encontrado.'
            });
        }

        return res.status(200).json(usuario);

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao buscar usuário.',
            detalhe: erro.message
        });
    }
});

// ATUALIZAR USUÁRIO
router.put('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não encontrado.'
            });
        }

        await usuario.update(req.body);

        return res.status(200).json(usuario);

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao atualizar usuário.',
            detalhe: erro.message
        });
    }
});

// EXCLUIR USUÁRIO
router.delete('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não encontrado.'
            });
        }

        await usuario.destroy();

        return res.status(200).json({
            mensagem: 'Usuário excluído com sucesso.'
        });

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao excluir usuário.',
            detalhe: erro.message
        });
    }
});

module.exports = router;
