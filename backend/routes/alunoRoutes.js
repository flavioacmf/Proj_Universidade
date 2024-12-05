const express = require("express");
const AlunoController = require("../controllers/AlunoController");

const router = express.Router();

// Listar todos os alunos
router.get("/", AlunoController.listar);

// Listar alunos inativos
router.get("/inativos", AlunoController.listarInativos);

// Criar novo aluno
router.post("/", validateAlunoData, AlunoController.criar);

// Visualizar aluno por ID
router.get("/:id", validateIdParam, AlunoController.visualizar);

// Atualizar aluno por ID
router.put("/:id", validateIdParam, validateAlunoData, AlunoController.atualizar);

// Excluir aluno por ID
router.delete("/:id", validateIdParam, AlunoController.excluir);

// Alternar status (ativo/inativo) de um aluno
router.patch("/:id/toggle-status", validateIdParam, AlunoController.toggleStatus);

// Middleware para validar ID nos parâmetros
function validateIdParam(req, res, next) {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ message: "O ID deve ser um número válido." });
  }
  next();
}

// Middleware para validar dados do aluno no corpo da requisição
function validateAlunoData(req, res, next) {
  const { nome, cpf, email, data_nascimento } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return res.status(400).json({ message: "O campo 'nome' é obrigatório e deve ser uma string válida." });
  }
  if (!cpf || !/^[0-9]{11}$/.test(cpf)) {
    return res.status(400).json({ message: "O campo 'cpf' é obrigatório e deve conter 11 dígitos numéricos." });
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "O campo 'email' é obrigatório e deve ser um endereço de email válido." });
  }
  if (!data_nascimento || isNaN(Date.parse(data_nascimento))) {
    return res.status(400).json({ message: "O campo 'data_nascimento' é obrigatório e deve ser uma data válida no formato YYYY-MM-DD." });
  }

  next();
}

module.exports = router;
