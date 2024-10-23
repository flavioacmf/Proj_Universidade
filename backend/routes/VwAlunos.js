// routes/AlunoRoute.js
const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const VwAlunosController = require('../controllers/VwAlunosController');  // Controller da view

// Rota para consultar os alunos através da view vw_Alunos
router.get('/view', VwAlunosController.getAllFromView);

// Outras rotas que interagem com a tabela de alunos diretamente
router.post('/', alunoController.createAluno);
router.get('/', alunoController.getAllAlunos);
router.put('/:id', alunoController.updateAluno);
router.delete('/:id', alunoController.deleteAluno);

module.exports = router;
