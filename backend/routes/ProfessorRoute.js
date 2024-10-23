const express = require('express'); 
const router = express.Router();
const ProfessorController = require('../controllers/ProfessorController'); // Importa o controlador de professores
const VwProfessoresController = require('../controllers/VwProfessoresController'); // Importa o controlador da view

// Rota para obter todos os professores (tabela Professores)
router.get('/', ProfessorController.getAllProfessores);

// Rota para obter os professores através da view vw_Professores
router.get('/view', VwProfessoresController.getAllFromView);  // Certifique-se de que esse método existe no controlador

// Rota para criar um novo professor
router.post('/', ProfessorController.createProfessor);

// Rota para atualizar um professor existente
router.put('/:id', ProfessorController.updateProfessor);

// Rota para excluir um professor
router.delete('/:id', ProfessorController.deleteProfessor);

module.exports = router;
