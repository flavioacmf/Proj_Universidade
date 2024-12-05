const Turma = require('../models/Turma');
const Disciplina = require('../models/Disciplina');

const Turma_DisciplinaController = {
    async listarDisciplinasPorTurma(req, res) {
        try {
            const { turmaId } = req.params;
            const turma = await Turma.findByPk(turmaId, {
                include: [{ model: Disciplina, as: "Disciplinas", through: { attributes: [] } }],
            });

            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            res.status(200).json(turma.Disciplinas);
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao listar disciplinas da turma',
                details: error.message,
            });
        }
    },

    async adicionarDisciplinas(req, res) {
        try {
            const { turmaId } = req.params;
            const { disciplinas } = req.body; // Array de IDs de disciplinas

            if (!Array.isArray(disciplinas) || disciplinas.length === 0) {
                return res.status(400).json({ error: 'Disciplinas devem ser um array não vazio' });
            }

            const turma = await Turma.findByPk(turmaId);
            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            const disciplinasExistentes = await Disciplina.findAll({ where: { id: disciplinas } });
            if (disciplinasExistentes.length === 0) {
                return res.status(404).json({ error: 'Nenhuma disciplina válida encontrada' });
            }

            await turma.addDisciplinas(disciplinasExistentes);

            res.status(201).json({ message: 'Disciplinas adicionadas à turma com sucesso!' });
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao adicionar disciplinas à turma',
                details: error.message,
            });
        }
    },

    async removerDisciplina(req, res) {
        try {
            const { turmaId, disciplinaId } = req.params;

            const turma = await Turma.findByPk(turmaId);
            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            const disciplina = await Disciplina.findByPk(disciplinaId);
            if (!disciplina) {
                return res.status(404).json({ error: 'Disciplina não encontrada' });
            }

            await turma.removeDisciplina(disciplina);

            res.status(200).json({ message: 'Disciplina removida da turma com sucesso!' });
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao remover disciplina da turma',
                details: error.message,
            });
        }
    },
};

module.exports = Turma_DisciplinaController;
