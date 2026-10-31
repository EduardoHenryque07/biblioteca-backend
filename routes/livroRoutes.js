
const express = require('express');
const router = express.Router();

const Livro = require('../models/Livro');

// POST - Cadastrar livro
router.post('/', async (req, res) => {
    try {
        const { titulo, autor, anoPublicacao, disponivel } = req.body;

        if (!titulo || !autor || !anoPublicacao) {
            return res.status(400).json({
                erro: 'Título, autor e ano de publicação são obrigatórios.'
            });
        }

        const livro = await Livro.create({
            titulo,
            autor,
            anoPublicacao,
            disponivel
        });

        return res.status(201).json(livro);

    } catch (erro) {
        return res.status(400).json({
            erro: 'Erro ao cadastrar livro.',
            detalhe: erro.message
        });
    }
});

// GET - Listar todos os livros
router.get('/', async (req, res) => {
    try {
        const livros = await Livro.findAll();

        return res.json(livros);

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao listar livros.',
            detalhe: erro.message
        });
    }
});

// GET - Buscar livro por ID
router.get('/:id', async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);

        if (!livro) {
            return res.status(404).json({
                erro: 'Livro não encontrado.'
            });
        }

        return res.json(livro);

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao buscar livro.',
            detalhe: erro.message
        });
    }
});

// PUT - Atualizar livro
router.put('/:id', async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);

        if (!livro) {
            return res.status(404).json({
                erro: 'Livro não encontrado.'
            });
        }

        await livro.update(req.body);

        return res.json(livro);

    } catch (erro) {
        return res.status(400).json({
            erro: 'Erro ao atualizar livro.',
            detalhe: erro.message
        });
    }
});

// DELETE - Excluir livro
router.delete('/:id', async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);

        if (!livro) {
            return res.status(404).json({
                erro: 'Livro não encontrado.'
            });
        }

        await livro.destroy();

        return res.json({
            mensagem: 'Livro excluído com sucesso.'
        });

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro ao excluir livro.',
            detalhe: erro.message
        });
    }
});

module.exports = router;
