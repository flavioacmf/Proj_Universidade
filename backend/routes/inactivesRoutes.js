const express = require("express");
const router = express.Router();

const models = {
  disciplinas: require("../models/Disciplina"),
  professores: require("../models/Professor"),
  salas: require("../models/Sala"),
  alunos: require("../models/Aluno"),
  turmas: require("../models/Turma"),
};

router.get("/:category/inativos", async (req, res) => {
  const { category } = req.params;
  const model = models[category];

  if (!model) {
    return res.status(400).json({ message: "Categoria inválida." });
  }

  try {
    const inactives = await model.findAll({ where: { ativo: false } });
    res.json(inactives);
  } catch (error) {
    console.error(`Erro ao buscar inativos para ${category}:`, error);
    res.status(500).json({ message: "Erro ao buscar itens inativos." });
  }
});

module.exports = router;
