// controllers/VwAlunosController.js
const VwAlunos = require('../models/VwAlunos');

exports.getAllFromView = async (req, res) => {
  try {
    const alunos = await VwAlunos.getAllFromView();
    res.status(200).json(alunos);  // Envia os dados da view como JSON
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar alunos da view vw_Alunos', error });
  }
};
