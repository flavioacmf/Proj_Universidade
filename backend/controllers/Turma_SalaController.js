const Turma = require('../models/Turma');
const Sala = require('../models/Sala');

const Turma_SalaController = {
    async listarSalasPorTurma(req, res) {
        try {
            const { turmaId } = req.params;
            const turma = await Turma.findByPk(turmaId, {
                include: [{ model: Sala, as: "Salas", through: { attributes: [] } }],
            });

            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            res.status(200).json(turma.Salas);
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao listar salas da turma',
                details: error.message,
            });
        }
    },

    async adicionarSalas(req, res) {
        try {
            const { turmaId } = req.params;
            const { salas } = req.body; // Array de IDs de salas

            if (!Array.isArray(salas) || salas.length === 0) {
                return res.status(400).json({ error: 'Salas devem ser um array não vazio' });
            }

            const turma = await Turma.findByPk(turmaId);
            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            const salasExistentes = await Sala.findAll({ where: { id: salas } });
            if (salasExistentes.length === 0) {
                return res.status(404).json({ error: 'Nenhuma sala válida encontrada' });
            }

            await turma.addSalas(salasExistentes);

            res.status(201).json({ message: 'Salas adicionadas à turma com sucesso!' });
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao adicionar salas à turma',
                details: error.message,
            });
        }
    },

    async removerSala(req, res) {
        try {
            const { turmaId, salaId } = req.params;

            const turma = await Turma.findByPk(turmaId);
            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            const sala = await Sala.findByPk(salaId);
            if (!sala) {
                return res.status(404).json({ error: 'Sala não encontrada' });
            }

            await turma.removeSala(sala);

            res.status(200).json({ message: 'Sala removida da turma com sucesso!' });
        } catch (error) {
            res.status(500).json({
                error: 'Erro ao remover sala da turma',
                details: error.message,
            });
        }
    },
};

module.exports = Turma_SalaController;
