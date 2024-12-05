const express = require("express");
const ProfessorController = require("../controllers/ProfessorController");

const router = express.Router();

// Listar todos os professores
router.get("/", ProfessorController.listar);

// Listar professores inativos
router.get("/inativos", ProfessorController.listarInativos);

// Criar novo professor
router.post("/", validateProfessorData, ProfessorController.criar);

// Visualizar professor por ID
router.get("/:id", validateIdParam, ProfessorController.visualizar);

// Atualizar professor por ID
router.put("/:id", validateIdParam, validateProfessorData, ProfessorController.atualizar);

// Excluir professor por ID
router.delete("/:id", validateIdParam, ProfessorController.excluir);

// Alternar status (ativo/inativo) de um professor
router.patch("/:id/toggle-status", validateIdParam, ProfessorController.toggleStatus);

// Middleware para validar ID nos parâmetros
function validateIdParam(req, res, next) {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ message: "O ID deve ser um número válido." });
  }
  next();
}

// Middleware para validar os dados do professor no corpo da requisição
function validateProfessorData(req, res, next) {
  const { nome, cpf, email, titulacao } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim().length < 3) {
    return res.status(400).json({
      message: "O campo 'nome' é obrigatório e deve ter pelo menos 3 caracteres.",
    });
  }
  if (!cpf || !/^[0-9]{11}$/.test(cpf)) {
    return res.status(400).json({
      message: "O campo 'cpf' é obrigatório e deve conter exatamente 11 dígitos numéricos.",
    });
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      message: "O campo 'email' é obrigatório e deve ser um endereço de email válido.",
    });
  }
  if (!titulacao || typeof titulacao !== "string" || titulacao.trim().length < 3) {
    return res.status(400).json({
      message: "O campo 'titulação' é obrigatório e deve ter pelo menos 3 caracteres.",
    });
  }

  next();
}

module.exports = router;
