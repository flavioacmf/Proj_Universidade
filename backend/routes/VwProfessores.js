// routes/VwProfessores.js
const express = require('express');
const router = express.Router();
const VwProfessoresController = require('../controllers/VwProfessores');

// Rota para listar todos os professores
router.get('/', VwProfessoresController.listarTodos);

// Rota para buscar professor por ID
router.get('/:id', VwProfessoresController.buscarPorId);

module.exports = router;
