// routes/VwDisciplinas.js
const express = require('express');
const router = express.Router();
const VwDisciplinasController = require('../controllers/VwDisciplinas');

// Rota para listar todas as disciplinas
router.get('/', VwDisciplinasController.listarTodos);

// Rota para buscar disciplina por ID
router.get('/:id', VwDisciplinasController.buscarPorId);

module.exports = router;
