const Professor = require('../models/ProfessorModel');

// Criar um novo professor
exports.createProfessor = async (req, res) => {
  try {
    const professor = await Professor.create(req.body);
    res.status(201).json(professor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar professor' });
  }
};

// Obter todos os professores
exports.getAllProfessores = async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.status(200).json(professores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter professores' });
  }
};

// Atualizar um professor
exports.updateProfessor = async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado' });
    }
    await professor.update(req.body);
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar professor' });
  }
};

// Excluir um professor
exports.deleteProfessor = async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado' });
    }
    await professor.destroy();
    res.status(200).json({ message: 'Professor excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir professor' });
  }
};
