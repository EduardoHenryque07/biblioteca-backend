
const express = require('express');
const router = express.Router();

const Avaliacao = require('../models/Avaliacao');
const { Usuario, Livro } = require('../models');

// POST - Cadastrar avaliação
router.post('/', async (req, res) => {
    try {
        const { livroId, usuarioId, nota, comentario } = req.body;

        if (!livroId || !usuarioId || !nota || !comentario) {
            return res.status(400).json({
                erro: 'Todos os campos são obrigatórios.'
            });
        }

        const usuario = await Usuario.findByPk(usuarioId);
        const livro = await Livro.findByPk(livroId);

        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não encontrado no PostgreSQL.'
            });
        }

        if (!livro) {
            return res.status(404).json({
                erro: 'Livro não encontrado no PostgreSQL.'
            });
        }

        const avaliacao = await Avaliacao.create({
            livroId,
            usuarioId,
            nota,
            comentario
        });

        return res.status(201).json(avaliacao);

    } catch (erro) {
        return res.status(400).json({
            erro: 'Erro ao cadastrar avaliação.',
            detalhe: erro.message
        });
    }
});

// GET - Listar avaliações
router.get('/', async (req, res) => {
    try {
        const avaliacoes = await Avaliacao.find();

        return res.json(avaliacoes);

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao listar avaliações.',
            detalhe: erro.message
        });
    }
});

// GET - Buscar avaliação por ID
router.get('/:id', async (req, res) => {
    try {
        const avaliacao = await Avaliacao.findById(req.params.id);

        if (!avaliacao) {
            return res.status(404).json({
                erro: 'Avaliação não encontrada.'
            });
        }

        return res.json(avaliacao);

    } catch (erro) {
        return res.status(400).json({
            erro: 'ID de avaliação inválido.',
            detalhe: erro.message
        });
    }
});

// PUT - Atualizar avaliação
router.put('/:id', async (req, res) => {
    try {
        const avaliacao = await Avaliacao.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!avaliacao) {
            return res.status(404).json({
                erro: 'Avaliação não encontrada.'
            });
        }

        return res.json(avaliacao);

    } catch (erro) {
        return res.status(400).json({
            erro: 'Erro ao atualizar avaliação.',
            detalhe: erro.message
        });
    }
});

// DELETE - Excluir avaliação
router.delete('/:id', async (req, res) => {
    try {
        const avaliacao = await Avaliacao.findByIdAndDelete(req.params.id);

        if (!avaliacao) {
            return res.status(404).json({
                erro: 'Avaliação não encontrada.'
            });
        }

        return res.json({
            mensagem: 'Avaliação excluída com sucesso.'
        });

    } catch (erro) {
        return res.status(400).json({
            erro: 'Erro ao excluir avaliação.',
            detalhe: erro.message
        });
    }
});

module.exports = router;
