const { Disciplina } = require("../models");
const { Op } = require("sequelize");

const DisciplinaController = {
  // Listar disciplinas inativas
  async listarInativos(req, res) {
    try {
      console.log("Requisição recebida no endpoint /disciplinas/inativos");
      const disciplinasInativas = await Disciplina.findAll({
        where: { ativo: false },
        order: [["nome", "ASC"]], // Ordenação padrão por nome
      });

      console.log("Disciplinas inativas encontradas:", disciplinasInativas);
      res.status(200).json(disciplinasInativas);
    } catch (error) {
      console.error("Erro ao listar disciplinas inativas:", error);
      res.status(500).json({ message: "Erro ao listar disciplinas inativas." });
    }
  },

  // Listar todas as disciplinas com filtros e ordenação
  async listar(req, res) {
    try {
      const { orderBy = "nome", orderDirection = "ASC", filterName, ativo } = req.query;

      const validColumns = ["nome", "codigo", "periodo", "ativo"];
      const validDirections = ["ASC", "DESC"];

      if (!validColumns.includes(orderBy) || !validDirections.includes(orderDirection.toUpperCase())) {
        return res.status(400).json({ message: "Parâmetros de ordenação inválidos." });
      }

      const whereCondition = {};
      if (filterName) whereCondition.nome = { [Op.like]: `%${filterName}%` };
      if (ativo !== undefined) whereCondition.ativo = ativo === "true";

      const disciplinas = await Disciplina.findAll({
        where: whereCondition,
        order: [[orderBy, orderDirection.toUpperCase()]],
      });

      console.log("Lista de disciplinas retornada com sucesso.");
      res.status(200).json(disciplinas);
    } catch (error) {
      console.error("Erro ao listar disciplinas:", error);
      res.status(500).json({ message: "Erro ao listar disciplinas." });
    }
  },

  // Criar uma nova disciplina
  async criar(req, res) {
    try {
      const { nome, codigo, periodo } = req.body;
      if (!nome || !codigo || !periodo) {
        return res.status(400).json({ message: "Os campos 'nome', 'codigo' e 'periodo' são obrigatórios." });
      }

      const disciplina = await Disciplina.create({ nome, codigo, periodo });
      console.log("Disciplina criada com sucesso:", disciplina);
      res.status(201).json(disciplina);
    } catch (error) {
      console.error("Erro ao criar disciplina:", error);
      res.status(500).json({ message: "Erro ao criar disciplina." });
    }
  },

  // Visualizar disciplina por ID
  async visualizar(req, res) {
    try {
      const { id } = req.params;
      const disciplina = await Disciplina.findByPk(id);

      if (!disciplina) {
        console.log("Disciplina não encontrada:", id);
        return res.status(404).json({ message: "Disciplina não encontrada." });
      }

      console.log("Disciplina encontrada:", disciplina);
      res.status(200).json(disciplina);
    } catch (error) {
      console.error("Erro ao visualizar disciplina:", error);
      res.status(500).json({ message: "Erro ao visualizar disciplina." });
    }
  },

  // Atualizar disciplina por ID
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, codigo, periodo } = req.body;

      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        console.log("Disciplina não encontrada:", id);
        return res.status(404).json({ message: "Disciplina não encontrada." });
      }

      await disciplina.update({ nome, codigo, periodo });
      console.log("Disciplina atualizada com sucesso:", disciplina);
      res.status(200).json(disciplina);
    } catch (error) {
      console.error("Erro ao atualizar disciplina:", error);
      res.status(500).json({ message: "Erro ao atualizar disciplina." });
    }
  },

  // Excluir disciplina por ID
  async excluir(req, res) {
    try {
      const { id } = req.params;

      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        console.log("Disciplina não encontrada:", id);
        return res.status(404).json({ message: "Disciplina não encontrada." });
      }

      await disciplina.destroy();
      console.log("Disciplina excluída com sucesso:", disciplina);
      res.status(200).json({ message: "Disciplina excluída com sucesso." });
    } catch (error) {
      console.error("Erro ao excluir disciplina:", error);
      res.status(500).json({ message: "Erro ao excluir disciplina." });
    }
  },

  // Alternar status (ativo/inativo) de uma disciplina
  async toggleStatus(req, res) {
    try {
      const { id } = req.params;

      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        console.log("Disciplina não encontrada:", id);
        return res.status(404).json({ message: "Disciplina não encontrada." });
      }

      disciplina.ativo = !disciplina.ativo;
      await disciplina.save();

      console.log("Status da disciplina alterado com sucesso:", disciplina.ativo);
      res.status(200).json(disciplina);
    } catch (error) {
      console.error("Erro ao alternar status:", error);
      res.status(500).json({ message: "Erro ao alternar status da disciplina." });
    }
  },
};

module.exports = DisciplinaController;
