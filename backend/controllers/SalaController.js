const { Sala } = require("../models");
const { Op } = require("sequelize");

const SalaController = {
  // Listar todas as salas com filtros e ordenação
  async listar(req, res) {
    try {
      const { orderBy = "nome", orderDirection = "ASC", filterName, ativo } = req.query;

      // Validar os parâmetros de ordenação
      const validColumns = ["nome", "local", "capacidade", "ativo"];
      const validDirections = ["ASC", "DESC"];

      if (
        !validColumns.includes(orderBy) ||
        !validDirections.includes(orderDirection.toUpperCase())
      ) {
        return res.status(400).json({ message: "Parâmetros de ordenação inválidos." });
      }

      const whereCondition = {};
      if (filterName) whereCondition.nome = { [Op.like]: `%${filterName}%` };
      if (ativo !== undefined) whereCondition.ativo = ativo === "true";

      const salas = await Sala.findAll({
        where: whereCondition,
        order: [[orderBy, orderDirection.toUpperCase()]],
      });

      res.status(200).json(salas);
    } catch (error) {
      console.error("Erro ao listar salas:", error);
      res.status(500).json({ message: "Erro ao listar salas." });
    }
  },

  // Listar apenas salas inativas
  async listarInativas(req, res) {
    try {
      const salasInativas = await Sala.findAll({
        where: { ativo: false },
        order: [["nome", "ASC"]],
      });

      res.status(200).json(salasInativas);
    } catch (error) {
      console.error("Erro ao listar salas inativas:", error);
      res.status(500).json({ message: "Erro ao listar salas inativas." });
    }
  },

  // Criar nova sala
  async criar(req, res) {
    try {
      const { nome, local, capacidade } = req.body;

      if (!nome || !local || !capacidade) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      const sala = await Sala.create({ nome, local, capacidade });
      res.status(201).json(sala);
    } catch (error) {
      console.error("Erro ao criar sala:", error);
      res.status(500).json({ message: "Erro ao criar sala." });
    }
  },

  // Visualizar sala por ID
  async visualizar(req, res) {
    try {
      const { id } = req.params;
      const sala = await Sala.findByPk(id);

      if (!sala) {
        return res.status(404).json({ message: "Sala não encontrada." });
      }

      res.status(200).json(sala);
    } catch (error) {
      console.error("Erro ao visualizar sala:", error);
      res.status(500).json({ message: "Erro ao visualizar sala." });
    }
  },

  // Atualizar sala por ID
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, local, capacidade } = req.body;

      const sala = await Sala.findByPk(id);

      if (!sala) {
        return res.status(404).json({ message: "Sala não encontrada." });
      }

      await sala.update({ nome, local, capacidade });
      res.status(200).json(sala);
    } catch (error) {
      console.error("Erro ao atualizar sala:", error);
      res.status(500).json({ message: "Erro ao atualizar sala." });
    }
  },

  // Excluir sala por ID
  async excluir(req, res) {
    try {
      const { id } = req.params;

      const sala = await Sala.findByPk(id);

      if (!sala) {
        return res.status(404).json({ message: "Sala não encontrada." });
      }

      await sala.destroy();
      res.status(200).json({ message: "Sala excluída com sucesso." });
    } catch (error) {
      console.error("Erro ao excluir sala:", error);
      res.status(500).json({ message: "Erro ao excluir sala." });
    }
  },

  // Alternar status (ativo/inativo) de uma sala
  async toggleStatus(req, res) {
    try {
      const { id } = req.params;

      const sala = await Sala.findByPk(id);

      if (!sala) {
        return res.status(404).json({ message: "Sala não encontrada." });
      }

      sala.ativo = !sala.ativo;
      await sala.save();

      res.status(200).json(sala);
    } catch (error) {
      console.error("Erro ao alternar status da sala:", error);
      res.status(500).json({ message: "Erro ao alternar status da sala." });
    }
  },
};

module.exports = SalaController;
