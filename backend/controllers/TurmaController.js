const { Turma, Aluno, Professor, Sala, Disciplina } = require("../models");
const { Op } = require("sequelize");

const TurmaController = {
  // Listar todas as turmas
  async listar(req, res) {
    try {
      const { ativo } = req.query;

      const whereCondition = {};
      if (ativo !== undefined) {
        whereCondition.ativo = ativo === "true";
      }

      const turmas = await Turma.findAll({
        where: whereCondition,
        include: [
          { model: Aluno, as: "Alunos", through: { attributes: [] } },
          { model: Professor, as: "Professores", through: { attributes: [] } },
          { model: Sala, as: "Salas", through: { attributes: [] } },
          { model: Disciplina, as: "Disciplinas", through: { attributes: [] } },
        ],
      });

      res.status(200).json(turmas);
    } catch (error) {
      console.error("Erro ao listar turmas:", error);
      res.status(500).json({ message: "Erro ao listar turmas.", details: error.message });
    }
  },

  // Criar uma nova turma
  async criar(req, res) {
    try {
      const { nome, dia_semana, horario_inicio, horario_termino, alunos, professores, disciplinas, salas } = req.body;

      if (!nome || !dia_semana || !horario_inicio || !horario_termino) {
        return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
      }

      const turma = await Turma.create({ nome, dia_semana, horario_inicio, horario_termino });

      // Associar entidades relacionadas
      if (alunos?.length) {
        const alunosExistentes = await Aluno.findAll({ where: { id: alunos } });
        await turma.addAlunos(alunosExistentes);
      }

      if (professores?.length) {
        const professoresExistentes = await Professor.findAll({ where: { id: professores } });
        await turma.addProfessores(professoresExistentes);
      }

      if (disciplinas?.length) {
        const disciplinasExistentes = await Disciplina.findAll({ where: { id: disciplinas } });
        await turma.addDisciplinas(disciplinasExistentes);
      }

      if (salas?.length) {
        const salasExistentes = await Sala.findAll({ where: { id: salas } });
        await turma.addSalas(salasExistentes);
      }

      res.status(201).json(turma);
    } catch (error) {
      console.error("Erro ao criar turma:", error);
      res.status(500).json({ message: "Erro ao criar turma.", details: error.message });
    }
  },

  // Atualizar uma turma
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, dia_semana, horario_inicio, horario_termino, alunos, professores, disciplinas, salas } = req.body;

      const turma = await Turma.findByPk(id);
      if (!turma) return res.status(404).json({ message: "Turma não encontrada." });

      await turma.update({ nome, dia_semana, horario_inicio, horario_termino });

      // Atualizar associações
      if (alunos) {
        const alunosExistentes = await Aluno.findAll({ where: { id: alunos } });
        await turma.setAlunos(alunosExistentes);
      }

      if (professores) {
        const professoresExistentes = await Professor.findAll({ where: { id: professores } });
        await turma.setProfessores(professoresExistentes);
      }

      if (disciplinas) {
        const disciplinasExistentes = await Disciplina.findAll({ where: { id: disciplinas } });
        await turma.setDisciplinas(disciplinasExistentes);
      }

      if (salas) {
        const salasExistentes = await Sala.findAll({ where: { id: salas } });
        await turma.setSalas(salasExistentes);
      }

      res.status(200).json(turma);
    } catch (error) {
      console.error("Erro ao atualizar turma:", error);
      res.status(500).json({ message: "Erro ao atualizar turma.", details: error.message });
    }
  },

  // Excluir uma turma
  async excluir(req, res) {
    try {
      const { id } = req.params;

      const turma = await Turma.findByPk(id);
      if (!turma) return res.status(404).json({ message: "Turma não encontrada." });

      await turma.setAlunos([]);
      await turma.setProfessores([]);
      await turma.setDisciplinas([]);
      await turma.setSalas([]);

      await turma.destroy();

      res.status(200).json({ message: "Turma excluída com sucesso." });
    } catch (error) {
      console.error("Erro ao excluir turma:", error);
      res.status(500).json({ message: "Erro ao excluir turma.", details: error.message });
    }
  },

  // Alternar o status ativo/inativo de uma turma
  async toggleStatus(req, res) {
    try {
      const { id } = req.params;

      const turma = await Turma.findByPk(id);
      if (!turma) return res.status(404).json({ message: "Turma não encontrada." });

      turma.ativo = !turma.ativo;
      await turma.save();

      res.status(200).json({ message: "Status da turma alterado com sucesso.", turma });
    } catch (error) {
      console.error("Erro ao alternar status da turma:", error);
      res.status(500).json({ message: "Erro ao alternar status da turma.", details: error.message });
    }
  },

  // Visualizar uma turma com detalhes
  async visualizar(req, res) {
    try {
      const { id } = req.params;

      const turma = await Turma.findByPk(id, {
        include: [
          { model: Aluno, as: "Alunos", through: { attributes: [] } },
          { model: Professor, as: "Professores", through: { attributes: [] } },
          { model: Sala, as: "Salas", through: { attributes: [] } },
          { model: Disciplina, as: "Disciplinas", through: { attributes: [] } },
        ],
      });

      if (!turma) return res.status(404).json({ message: "Turma não encontrada." });

      res.status(200).json(turma);
    } catch (error) {
      console.error("Erro ao visualizar turma:", error);
      res.status(500).json({ message: "Erro ao visualizar turma.", details: error.message });
    }
  },
};

module.exports = TurmaController;
