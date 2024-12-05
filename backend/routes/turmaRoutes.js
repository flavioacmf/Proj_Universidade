const express = require("express");
const TurmaController = require("../controllers/TurmaController");
const Turma_AlunoController = require("../controllers/Turma_AlunoController");
const Turma_ProfessorController = require("../controllers/Turma_ProfessorController");
const Turma_DisciplinaController = require("../controllers/Turma_DisciplinaController");
const Turma_SalaController = require("../controllers/Turma_SalaController");

const router = express.Router();

// Middleware para validação de ID
const validateIdParam = (req, res, next) => {
  const { id, turmaId, alunoId, professorId, disciplinaId, salaId } = req.params;
  const ids = { id, turmaId, alunoId, professorId, disciplinaId, salaId };

  for (const [key, value] of Object.entries(ids)) {
    if (value && isNaN(Number(value))) {
      return res.status(400).json({ message: `O ID '${key}' deve ser um número válido.` });
    }
  }
  next();
};

// Rotas principais para Turma
router.get("/", TurmaController.listar); // Listar todas as turmas
router.post("/", TurmaController.criar); // Criar nova turma
router.put("/:id", validateIdParam, TurmaController.atualizar); // Atualizar turma
router.delete("/:id", validateIdParam, TurmaController.excluir); // Excluir turma
router.patch("/:id/toggle-status", validateIdParam, TurmaController.toggleStatus); // Alternar status ativo/inativo

// Rotas para gerenciar Alunos em uma Turma
router.get("/:turmaId/alunos", validateIdParam, Turma_AlunoController.listarAlunosPorTurma); // Listar alunos de uma turma
router.post("/:turmaId/alunos", validateIdParam, Turma_AlunoController.adicionarAlunos); // Adicionar alunos à turma
router.delete("/:turmaId/alunos/:alunoId", validateIdParam, Turma_AlunoController.removerAluno); // Remover aluno de uma turma

// Rotas para gerenciar Professores em uma Turma
router.get("/:turmaId/professores", validateIdParam, Turma_ProfessorController.listarProfessoresPorTurma); // Listar professores de uma turma
router.post("/:turmaId/professores", validateIdParam, Turma_ProfessorController.adicionarProfessores); // Adicionar professores à turma
router.delete("/:turmaId/professores/:professorId", validateIdParam, Turma_ProfessorController.removerProfessor); // Remover professor de uma turma

// Rotas para gerenciar Disciplinas em uma Turma
router.get("/:turmaId/disciplinas", validateIdParam, Turma_DisciplinaController.listarDisciplinasPorTurma); // Listar disciplinas de uma turma
router.post("/:turmaId/disciplinas", validateIdParam, Turma_DisciplinaController.adicionarDisciplinas); // Adicionar disciplinas à turma
router.delete("/:turmaId/disciplinas/:disciplinaId", validateIdParam, Turma_DisciplinaController.removerDisciplina); // Remover disciplina de uma turma

// Rotas para gerenciar Salas em uma Turma
router.get("/:turmaId/salas", validateIdParam, Turma_SalaController.listarSalasPorTurma); // Listar salas de uma turma
router.post("/:turmaId/salas", validateIdParam, Turma_SalaController.adicionarSalas); // Adicionar salas à turma
router.delete("/:turmaId/salas/:salaId", validateIdParam, Turma_SalaController.removerSala); // Remover sala de uma turma

module.exports = router;
