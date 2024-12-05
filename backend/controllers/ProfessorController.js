const { Professor } = require("../models");
const { Op } = require("sequelize");

const ProfessorController = {
  // Listar professores inativos
  async listarInativos(req, res) {
    try {
      console.log("Requisição recebida para listar professores inativos.");
      const professoresInativos = await Professor.findAll({
        where: { ativo: false },
        order: [["nome", "ASC"]],
      });

      console.log("Professores inativos encontrados:", professoresInativos);
      res.status(200).json(professoresInativos);
    } catch (error) {
      console.error("Erro ao listar professores inativos:", error);
      res.status(500).json({ message: "Erro ao listar professores inativos." });
    }
  },

  // Listar todos os professores com filtros e ordenação
  async listar(req, res) {
    try {
      const {
        orderBy = "nome",
        orderDirection = "ASC",
        filterName,
        ativo,
      } = req.query;

      const validColumns = ["nome", "cpf", "email", "titulacao", "ativo"];
      const validDirections = ["ASC", "DESC"];

      if (!validColumns.includes(orderBy) || !validDirections.includes(orderDirection.toUpperCase())) {
        return res.status(400).json({ message: "Parâmetros de ordenação inválidos." });
      }

      const whereCondition = {};
      if (filterName) whereCondition.nome = { [Op.like]: `%${filterName}%` };
      if (ativo !== undefined) whereCondition.ativo = ativo === "true";

      const professores = await Professor.findAll({
        where: whereCondition,
        order: [[orderBy, orderDirection.toUpperCase()]],
      });

      console.log("Lista de professores retornada com sucesso.");
      res.status(200).json(professores);
    } catch (error) {
      console.error("Erro ao listar professores:", error);
      res.status(500).json({ message: "Erro ao listar professores." });
    }
  },

  // Criar um novo professor
  async criar(req, res) {
    try {
      const { nome, cpf, email, titulacao } = req.body;

      if (!nome || !cpf || !email || !titulacao) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      const professor = await Professor.create({ nome, cpf, email, titulacao });
      console.log("Professor criado com sucesso:", professor);
      res.status(201).json(professor);
    } catch (error) {
      console.error("Erro ao criar professor:", error);
      res.status(500).json({ message: "Erro ao criar professor." });
    }
  },

  // Visualizar professor por ID
  async visualizar(req, res) {
    try {
      const { id } = req.params;
      const professor = await Professor.findByPk(id);

      if (!professor) {
        console.log("Professor não encontrado:", id);
        return res.status(404).json({ message: "Professor não encontrado." });
      }

      console.log("Professor encontrado:", professor);
      res.status(200).json(professor);
    } catch (error) {
      console.error("Erro ao visualizar professor:", error);
      res.status(500).json({ message: "Erro ao visualizar professor." });
    }
  },

  // Atualizar professor por ID
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, email, titulacao } = req.body;

      const professor = await Professor.findByPk(id);
      if (!professor) {
        console.log("Professor não encontrado:", id);
        return res.status(404).json({ message: "Professor não encontrado." });
      }

      await professor.update({ nome, cpf, email, titulacao });
      console.log("Professor atualizado com sucesso:", professor);
      res.status(200).json(professor);
    } catch (error) {
      console.error("Erro ao atualizar professor:", error);
      res.status(500).json({ message: "Erro ao atualizar professor." });
    }
  },

  // Excluir professor por ID
  async excluir(req, res) {
    try {
      const { id } = req.params;

      const professor = await Professor.findByPk(id);
      if (!professor) {
        console.log("Professor não encontrado:", id);
        return res.status(404).json({ message: "Professor não encontrado." });
      }

      await professor.destroy();
      console.log("Professor excluído com sucesso:", professor);
      res.status(200).json({ message: "Professor excluído com sucesso." });
    } catch (error) {
      console.error("Erro ao excluir professor:", error);
      res.status(500).json({ message: "Erro ao excluir professor." });
    }
  },

  // Alternar status (ativo/inativo) de um professor
  async toggleStatus(req, res) {
    try {
      const { id } = req.params;

      const professor = await Professor.findByPk(id);
      if (!professor) {
        console.log("Professor não encontrado:", id);
        return res.status(404).json({ message: "Professor não encontrado." });
      }

      professor.ativo = !professor.ativo;
      await professor.save();

      console.log("Status do professor alterado com sucesso para:", professor.ativo);
      res.status(200).json(professor);
    } catch (error) {
      console.error("Erro ao alternar status do professor:", error);
      res.status(500).json({ message: "Erro ao alternar status do professor." });
    }
  },
};

module.exports = ProfessorController;
