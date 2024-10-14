const express = require('express');
const alunoController = require('../controllers/alunoController');

const router = express.Router();

router.post('/aluno', alunoController.createAluno);

module.exports = router;
