// controllers/SalaController.js
const Sala = require('../models/SalaModel');
const VwSalas = require('../models/VwSalas'); // Importa o modelo da view de Salas

const SalaController = {
  // Função para obter todas as salas (usando a view)
  async getSalas(req, res) {
    try {
      const salas = await VwSalas.findAll(); // Buscar todas as salas da view
      res.status(200).json(salas);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar salas', error: err.message });
    }
  },

  // Função para criar uma nova sala
  async createSala(req, res) {
    const { numeroSala, capacidade, dataCadastro } = req.body;
    if (!numeroSala || !capacidade || !dataCadastro) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    try {
      const result = await Sala.create({ numeroSala, capacidade, dataCadastro });
      res.status(201).json({ message: 'Sala criada com sucesso', id: result.insertId });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar sala', error: err.message });
    }
  },

  // Função para editar uma sala
  async updateSala(req, res) {
    const { id } = req.params;
    const { numeroSala, capacidade, dataCadastro } = req.body;

    if (!numeroSala || !capacidade || !dataCadastro) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    try {
      const result = await Sala.update(id, { numeroSala, capacidade, dataCadastro });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Sala não encontrada' });
      }
      res.status(200).json({ message: 'Sala atualizada com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao editar sala', error: err.message });
    }
  },

  // Função para excluir uma sala
  async deleteSala(req, res) {
    const { id } = req.params;
    try {
      const result = await Sala.delete(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Sala não encontrada' });
      }
      res.status(200).json({ message: 'Sala excluída com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao excluir sala', error: err.message });
    }
  },
};

module.exports = SalaController;
