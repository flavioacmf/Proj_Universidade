// routes/VwSalas.js
const express = require('express');
const router = express.Router();
const VwSalasController = require('../controllers/VwSalas');

// Rota para listar todas as salas
router.get('/', VwSalasController.listarTodos);

// Rota para buscar sala por ID
router.get('/:id', VwSalasController.buscarPorId);

module.exports = router;
