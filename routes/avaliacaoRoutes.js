const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');

router.post('/', avaliacaoController.cadastrarAvaliacao);
router.get('/', avaliacaoController.listarAvaliacoes);
router.get('/:id', avaliacaoController.buscarAvaliacaoPorId);
router.put('/:id', avaliacaoController.atualizarAvaliacao);
router.delete('/:id', avaliacaoController.excluirAvaliacao);

module.exports = router;