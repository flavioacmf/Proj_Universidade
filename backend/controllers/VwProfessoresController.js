const VwProfessores = require('../models/VwProfessores'); // Importa o modelo da view de Professores

const VwProfessoresController = {
    // Método para listar todos os professores da view
    async getAllFromView(req, res) {
        try {
            const professores = await VwProfessores.findAll();
            res.status(200).json(professores);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar professores' });
        }
    },

    // Método para buscar professor por ID na view
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const professor = await VwProfessores.findByPk(id);
            if (professor) {
                res.status(200).json(professor);
            } else {
                res.status(404).json({ error: 'Professor não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar professor' });
        }
    }
};

module.exports = VwProfessoresController;
