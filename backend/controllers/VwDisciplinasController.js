// controllers/VwDisciplinasController.js
const VwDisciplinas = require('../models/VwDisciplinas');

const VwDisciplinasController = {
    async listarTodos(req, res) {
        try {
            const disciplinas = await VwDisciplinas.findAll();
            res.status(200).json(disciplinas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar disciplinas' });
        }
    },

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const disciplina = await VwDisciplinas.findByPk(id);
            if (disciplina) {
                res.status(200).json(disciplina);
            } else {
                res.status(404).json({ error: 'Disciplina não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar disciplina' });
        }
    }
};

module.exports = VwDisciplinasController;
