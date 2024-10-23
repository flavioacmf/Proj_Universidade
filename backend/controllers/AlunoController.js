// controllers/AlunoController.js
const Aluno = require('../models/AlunoModel');
const VwAlunos = require('../models/VwAlunos'); // Importa o modelo da view de Alunos

// Função para criar um novo aluno
const createAluno = async (req, res) => {
  const { nome, email, telefone } = req.body;

  try {
    // Verificar se o aluno já existe
    const alunoExistente = await Aluno.findOne({ where: { email } });
    if (alunoExistente) {
      return res.status(400).json({ error: 'Aluno com esse email já existe' });
    }

    // Criar o aluno no banco de dados
    const novoAluno = await Aluno.create({ nome, email, telefone });
    res.status(201).json(novoAluno);  // Retorna o aluno criado
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar aluno' });
  }
};

// Função para listar todos os alunos (usando a view)
const getAllAlunos = async (req, res) => {
  try {
    const alunos = await VwAlunos.findAll();  // Buscar todos os alunos da view
    res.status(200).json(alunos);  // Retorna todos os alunos
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao recuperar alunos' });
  }
};

// Função para editar um aluno
const updateAluno = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;

  try {
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    // Atualizar o aluno no banco de dados
    aluno.nome = nome;
    aluno.email = email;
    aluno.telefone = telefone;
    await aluno.save();

    res.status(200).json(aluno);  // Retorna o aluno atualizado
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
};

// Função para excluir um aluno
const deleteAluno = async (req, res) => {
  const { id } = req.params;

  try {
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    await aluno.destroy();  // Excluir o aluno
    res.status(200).json({ message: 'Aluno excluído com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir aluno' });
  }
};

module.exports = { createAluno, getAllAlunos, updateAluno, deleteAluno };