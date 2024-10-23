// routes/VwProfessores.js
const express = require('express');
const router = express.Router();
const VwProfessoresController = require('../controllers/VwProfessoresController');

// Rota para listar todos os professores
router.get('/', VwProfessoresController.getAllFromView);  // Alterado para a função correta

// Rota para buscar professor por ID
router.get('/:id', VwProfessoresController.buscarPorId);

module.exports = router;
