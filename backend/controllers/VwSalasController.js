// controllers/VwSalas.js
const VwSalas = require('../models/VwSalas');

const VwSalasController = {
    async listarTodos(req, res) {
        try {
            const salas = await VwSalas.findAll();
            res.status(200).json(salas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar salas' });
        }
    },

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const sala = await VwSalas.findByPk(id);
            if (sala) {
                res.status(200).json(sala);
            } else {
                res.status(404).json({ error: 'Sala não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar sala' });
        }
    }
};

module.exports = VwSalasController;
