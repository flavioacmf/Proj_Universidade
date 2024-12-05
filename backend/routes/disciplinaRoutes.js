const express = require("express");
const DisciplinaController = require("../controllers/DisciplinaController");

const router = express.Router();

// Listar todas as disciplinas
router.get("/", DisciplinaController.listar);

// Listar disciplinas inativas
router.get("/inativos", DisciplinaController.listarInativos);

// Criar nova disciplina
router.post("/", validateDisciplinaData, DisciplinaController.criar);

// Visualizar disciplina por ID
router.get("/:id", validateIdParam, DisciplinaController.visualizar);

// Atualizar disciplina por ID
router.put("/:id", validateIdParam, validateDisciplinaData, DisciplinaController.atualizar);

// Excluir disciplina por ID
router.delete("/:id", validateIdParam, DisciplinaController.excluir);

// Alternar status (ativo/inativo) de uma disciplina
router.patch("/:id/toggle-status", validateIdParam, DisciplinaController.toggleStatus);

// Middleware para validar ID nos parâmetros
function validateIdParam(req, res, next) {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ message: "O ID deve ser um número válido." });
  }
  next();
}

// Middleware para validar os dados da disciplina no corpo da requisição
function validateDisciplinaData(req, res, next) {
  const { nome, codigo, periodo } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim().length < 3) {
    return res.status(400).json({
      message: "O campo 'nome' é obrigatório e deve ter pelo menos 3 caracteres.",
    });
  }
  if (!codigo || typeof codigo !== "string" || codigo.trim().length > 10) {
    return res.status(400).json({
      message: "O campo 'código' é obrigatório e deve ter no máximo 10 caracteres.",
    });
  }
  if (!periodo || typeof periodo !== "string" || periodo.trim().length < 3) {
    return res.status(400).json({
      message: "O campo 'período' é obrigatório e deve ter pelo menos 3 caracteres.",
    });
  }

  next();
}

module.exports = router;
