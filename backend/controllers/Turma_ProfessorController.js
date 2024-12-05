const Turma = require('../models/Turma');
const Professor = require('../models/Professor');

const Turma_ProfessorController = {
    async listarProfessoresPorTurma(req, res) {
        try {
            const { turmaId } = req.params;
            const turma = await Turma.findByPk(turmaId, {
                include: [{ model: Professor, as: "Professores", through: { attributes: [] } }],
            });

            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            res.status(200).json(turma.Professores);
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao listar professores da turma',
                details: error.message,
            });
        }
    },

    async adicionarProfessores(req, res) {
        try {
            const { turmaId } = req.params;
            const { professores } = req.body; // Array de IDs de professores

            if (!Array.isArray(professores) || professores.length === 0) {
                return res.status(400).json({ error: 'Professores devem ser um array não vazio' });
            }

            const turma = await Turma.findByPk(turmaId);
            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            const professoresExistentes = await Professor.findAll({ where: { id: professores } });
            if (professoresExistentes.length === 0) {
                return res.status(404).json({ error: 'Nenhum professor válido encontrado' });
            }

            await turma.addProfessores(professoresExistentes);

            res.status(201).json({ message: 'Professores adicionados à turma com sucesso!' });
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao adicionar professores à turma',
                details: error.message,
            });
        }
    },

    async removerProfessor(req, res) {
        try {
            const { turmaId, professorId } = req.params;

            const turma = await Turma.findByPk(turmaId);
            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            const professor = await Professor.findByPk(professorId);
            if (!professor) {
                return res.status(404).json({ error: 'Professor não encontrado' });
            }

            await turma.removeProfessor(professor);

            res.status(200).json({ message: 'Professor removido da turma com sucesso!' });
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao remover professor da turma',
                details: error.message,
            });
        }
    },
};

module.exports = Turma_ProfessorController;
