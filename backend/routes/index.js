const express = require("express");
const router = express.Router();

const alunoRoutes = require("./alunoRoutes");
const professorRoutes = require("./professorRoutes");
const disciplinaRoutes = require("./disciplinaRoutes");
const salaRoutes = require("./salaRoutes");
const turmaRoutes = require("./turmaRoutes");
const inactivesRoutes = require("./inactivesRoutes"); // Rota para itens inativos

// Rotas específicas
router.use("/alunos", alunoRoutes);
router.use("/professores", professorRoutes);
router.use("/disciplinas", disciplinaRoutes);
router.use("/salas", salaRoutes);
router.use("/turmas", turmaRoutes);

// Rota para itens inativos
router.use("/common", inactivesRoutes);

module.exports = router;
