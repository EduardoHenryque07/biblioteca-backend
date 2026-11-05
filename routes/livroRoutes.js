
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const Livro = require('../models/Livro');
const { Emprestimo } = require('../models');
const registrarErro = require('../utils/logger');

// LISTAR LIVROS COM FILTROS E ORDENAÇÃO
router.get('/', async (req, res) => {
    try {
        const { titulo, autor, disponivel, ordenar } = req.query;

        const where = {};

        // Filtro por título
        if (titulo) {
            where.titulo = {
                [Op.iLike]: `%${titulo}%`
            };
        }

        // Filtro por autor
        if (autor) {
            where.autor = {
                [Op.iLike]: `%${autor}%`
            };
        }

        // Filtro por disponibilidade
        if (disponivel !== undefined) {
            if (!['true', 'false'].includes(disponivel)) {
                return res.status(400).json({
                    erro: 'O filtro disponivel deve ser true ou false.'
                });
            }

            where.disponivel = disponivel === 'true';
        }

        // Ordenação
        let order = [['id', 'ASC']];

        if (ordenar === 'titulo') {
            order = [['titulo', 'ASC']];
        } else if (ordenar === 'titulo_desc') {
            order = [['titulo', 'DESC']];
        } else if (ordenar === 'ano') {
            order = [['anoPublicacao', 'ASC']];
        } else if (ordenar === 'ano_desc') {
            order = [['anoPublicacao', 'DESC']];
        } else if (
            ordenar &&
            !['titulo', 'titulo_desc', 'ano', 'ano_desc'].includes(ordenar)
        ) {
            return res.status(400).json({
                erro: 'Ordenação inválida. Use titulo, titulo_desc, ano ou ano_desc.'
            });
        }

        const livros = await Livro.findAll({
            where,
            order
        });

        return res.json(livros);

    } catch (erro) {
        registrarErro(erro, 'Erro ao listar livros');

        return res.status(500).json({
            erro: 'Erro ao listar livros.',
            detalhe: erro.message
        });
    }
});

// BUSCAR LIVRO POR ID
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
        registrarErro(erro, 'Erro ao buscar livro');

        return res.status(500).json({
            erro: 'Erro ao buscar livro.',
            detalhe: erro.message
        });
    }
});

// CADASTRAR LIVRO
router.post('/', async (req, res) => {
    try {
        const { titulo, autor, anoPublicacao, disponivel } = req.body;

        const livro = await Livro.create({
            titulo,
            autor,
            anoPublicacao,
            disponivel
        });

        return res.status(201).json({
            mensagem: 'Livro cadastrado com sucesso!',
            livro
        });

    } catch (erro) {
        registrarErro(erro, 'Erro ao cadastrar livro');

        return res.status(400).json({
            erro: 'Erro ao cadastrar livro.',
            detalhe: erro.message
        });
    }
});

// ATUALIZAR LIVRO
router.put('/:id', async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);

        if (!livro) {
            return res.status(404).json({
                erro: 'Livro não encontrado.'
            });
        }

        const { titulo, autor, anoPublicacao, disponivel } = req.body;

        const dadosAtualizacao = {};

        if (titulo !== undefined) {
            dadosAtualizacao.titulo = titulo;
        }

        if (autor !== undefined) {
            dadosAtualizacao.autor = autor;
        }

        if (anoPublicacao !== undefined) {
            dadosAtualizacao.anoPublicacao = anoPublicacao;
        }

        if (disponivel !== undefined) {
            if (typeof disponivel !== 'boolean') {
                return res.status(400).json({
                    erro: 'A disponibilidade deve ser true ou false.'
                });
            }

            dadosAtualizacao.disponivel = disponivel;
        }

        if (Object.keys(dadosAtualizacao).length === 0) {
            return res.status(400).json({
                erro: 'Informe pelo menos um campo para atualizar.'
            });
        }

        // Impede alterar manualmente a disponibilidade de livro emprestado.
        if (
            disponivel !== undefined &&
            disponivel !== livro.disponivel
        ) {
            const emprestimoAtivo = await Emprestimo.findOne({
                where: {
                    livroId: livro.id,
                    dataDevolucao: null
                }
            });

            if (emprestimoAtivo) {
                return res.status(400).json({
                    erro: 'A disponibilidade deste livro é controlada pelo módulo de empréstimos.'
                });
            }
        }

        await livro.update(dadosAtualizacao);

        return res.json({
            mensagem: 'Livro atualizado com sucesso!',
            livro
        });

    } catch (erro) {
        registrarErro(erro, 'Erro ao atualizar livro');

        return res.status(400).json({
            erro: 'Erro ao atualizar livro.',
            detalhe: erro.message
        });
    }
});

// EXCLUIR LIVRO
router.delete('/:id', async (req, res) => {
    try {
        const livro = await Livro.findByPk(req.params.id);

        if (!livro) {
            return res.status(404).json({
                erro: 'Livro não encontrado.'
            });
        }

        const possuiEmprestimos = await Emprestimo.findOne({
            where: {
                livroId: livro.id
            }
        });

        if (possuiEmprestimos) {
            return res.status(400).json({
                erro: 'Não é possível excluir este livro porque existem empréstimos relacionados a ele.'
            });
        }

        await livro.destroy();

        return res.json({
            mensagem: 'Livro excluído com sucesso!'
        });

    } catch (erro) {
        registrarErro(erro, 'Erro ao excluir livro');

        return res.status(500).json({
            erro: 'Erro ao excluir livro.',
            detalhe: erro.message
        });
    }
});

module.exports = router;
