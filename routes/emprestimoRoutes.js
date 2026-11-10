const express = require('express');
const router = express.Router();
const emprestimoController = require('../controllers/emprestimoController');

router.post('/', emprestimoController.cadastrarEmprestimo);
router.get('/', emprestimoController.listarEmprestimos);
router.get('/:id', emprestimoController.buscarEmprestimoPorId);
router.put('/:id', emprestimoController.atualizarEmprestimo);
router.delete('/:id', emprestimoController.excluirEmprestimo);

module.exports = router;