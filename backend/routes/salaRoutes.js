const express = require("express");
const SalaController = require("../controllers/SalaController");

const router = express.Router();

// Listar todas as salas
router.get("/", SalaController.listar);

// Listar salas inativas
router.get("/inativos", SalaController.listarInativas);

// Criar nova sala
router.post("/", validateSalaData, SalaController.criar);

// Visualizar sala por ID
router.get("/:id", validateIdParam, SalaController.visualizar);

// Atualizar sala por ID
router.put("/:id", validateIdParam, validateSalaData, SalaController.atualizar);

// Excluir sala por ID
router.delete("/:id", validateIdParam, SalaController.excluir);

// Alternar status (ativo/inativo) de uma sala
router.patch("/:id/toggle-status", validateIdParam, SalaController.toggleStatus);

// Middleware para validar ID nos parâmetros
function validateIdParam(req, res, next) {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ message: "O ID deve ser um número válido." });
  }
  next();
}

// Middleware para validar dados da sala no corpo da requisição
function validateSalaData(req, res, next) {
  const { nome, local, capacidade } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim().length < 3) {
    return res.status(400).json({
      message: "O campo 'nome' é obrigatório e deve ter pelo menos 3 caracteres.",
    });
  }
  if (!local || typeof local !== "string" || local.trim().length < 3) {
    return res.status(400).json({
      message: "O campo 'local' é obrigatório e deve ter pelo menos 3 caracteres.",
    });
  }
  if (!capacidade || !Number.isInteger(capacidade) || capacidade < 1) {
    return res.status(400).json({
      message: "O campo 'capacidade' é obrigatório e deve ser um número inteiro maior ou igual a 1.",
    });
  }

  next();
}

module.exports = router;
