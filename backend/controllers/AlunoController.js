const { Aluno } = require("../models");
const { Op } = require("sequelize");
const validarCpf = require("../utils/validarCpf");

const AlunoController = {
  // Método para listar alunos inativos
  async listarInativos(req, res) {
    try {
      console.log("Requisição recebida no endpoint /inativos");
      const alunosInativos = await Aluno.findAll({
        where: { ativo: false },
        order: [["nome", "ASC"]], // Ordenação padrão por nome
      });

      console.log("Alunos inativos encontrados:", alunosInativos);
      res.status(200).json(alunosInativos);
    } catch (error) {
      console.error("Erro ao listar alunos inativos:", error);
      res.status(500).json({ message: "Erro ao listar alunos inativos." });
    }
  },

  // Listar todos os alunos com filtros e ordenação
  async listar(req, res) {
    try {
      const { orderBy = "nome", orderDirection = "ASC", filterName, ativo } = req.query;

      const validColumns = ["nome", "cpf", "email", "data_nascimento", "ativo"];
      const validDirections = ["ASC", "DESC"];

      if (!validColumns.includes(orderBy) || !validDirections.includes(orderDirection.toUpperCase())) {
        return res.status(400).json({ message: "Parâmetros de ordenação inválidos." });
      }

      const whereCondition = {};
      if (filterName) whereCondition.nome = { [Op.like]: `%${filterName}%` };
      if (ativo !== undefined) whereCondition.ativo = ativo === "true";

      const alunos = await Aluno.findAll({
        where: whereCondition,
        order: [[orderBy, orderDirection.toUpperCase()]],
      });

      console.log("Lista de alunos retornada com sucesso.");
      res.status(200).json(alunos);
    } catch (error) {
      console.error("Erro ao listar alunos:", error);
      res.status(500).json({ message: "Erro ao listar alunos." });
    }
  },

  // Criar novo aluno
  async criar(req, res) {
    try {
      const { nome, cpf, email, data_nascimento } = req.body;

      if (!validarCpf(cpf)) {
        return res.status(400).json({ message: "CPF inválido." });
      }

      const aluno = await Aluno.create({ nome, cpf, email, data_nascimento });
      console.log("Aluno criado com sucesso:", aluno);
      res.status(201).json(aluno);
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      res.status(500).json({ message: "Erro ao criar aluno." });
    }
  },

  // Visualizar aluno por ID
  async visualizar(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado." });
      }

      console.log("Aluno encontrado:", aluno);
      res.status(200).json(aluno);
    } catch (error) {
      console.error("Erro ao visualizar aluno:", error);
      res.status(500).json({ message: "Erro ao visualizar aluno." });
    }
  },

  // Atualizar aluno por ID
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, email, data_nascimento } = req.body;

      if (!validarCpf(cpf)) {
        return res.status(400).json({ message: "CPF inválido." });
      }

      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado." });
      }

      await aluno.update({ nome, cpf, email, data_nascimento });
      console.log("Aluno atualizado com sucesso:", aluno);
      res.status(200).json(aluno);
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      res.status(500).json({ message: "Erro ao atualizar aluno." });
    }
  },

  // Excluir aluno por ID
  async excluir(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado." });
      }

      await aluno.destroy();
      console.log("Aluno excluído com sucesso:", aluno);
      res.status(200).json({ message: "Aluno excluído com sucesso." });
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
      res.status(500).json({ message: "Erro ao excluir aluno." });
    }
  },

  // Alternar status (ativo/inativo) de um aluno
  async toggleStatus(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado." });
      }

      aluno.ativo = !aluno.ativo;
      await aluno.save();
      console.log(`Status do aluno com ID ${id} alterado para: ${aluno.ativo ? "Ativo" : "Inativo"}`);
      res.status(200).json(aluno);
    } catch (error) {
      console.error("Erro ao alternar status:", error);
      res.status(500).json({ message: "Erro ao alternar status do aluno." });
    }
  },
};

module.exports = AlunoController;
