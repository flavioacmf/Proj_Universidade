const Turma = require("../models/Turma");
const Aluno = require("../models/Aluno");

const Turma_AlunoController = {
    async listarAlunosPorTurma(req, res) {
        try {
            const { turmaId } = req.params;

            // Verifica se a turma existe
            const turma = await Turma.findByPk(turmaId, {
                include: [
                    {
                        model: Aluno,
                        through: { attributes: [] },
                        as: "Alunos",
                    },
                ],
            });

            if (!turma) {
                return res.status(404).json({ error: "Turma não encontrada" });
            }

            res.status(200).json(turma.Alunos);
        } catch (error) {
            console.error("Erro ao listar alunos da turma:", error);
            res.status(500).json({
                error: "Erro ao listar alunos da turma",
                details: error.message,
            });
        }
    },

    async adicionarAlunos(req, res) {
        try {
            const { turmaId } = req.params;
            const { alunos } = req.body; // Array de IDs de alunos

            if (!Array.isArray(alunos) || alunos.length === 0) {
                return res.status(400).json({ error: "Nenhum aluno fornecido" });
            }

            // Verifica se a turma existe
            const turma = await Turma.findByPk(turmaId);
            if (!turma) {
                return res.status(404).json({ error: "Turma não encontrada" });
            }

            // Verifica se os alunos existem
            const alunosExistentes = await Aluno.findAll({ where: { id: alunos } });
            if (alunosExistentes.length === 0) {
                return res.status(404).json({ error: "Nenhum aluno válido encontrado" });
            }

            await turma.addAlunos(alunosExistentes);

            res.status(201).json({ message: "Alunos adicionados à turma com sucesso!" });
        } catch (error) {
            console.error("Erro ao adicionar alunos à turma:", error);
            res.status(500).json({
                error: "Erro ao adicionar alunos à turma",
                details: error.message,
            });
        }
    },

    async removerAluno(req, res) {
        try {
            const { turmaId, alunoId } = req.params;

            // Verifica se a turma existe
            const turma = await Turma.findByPk(turmaId);
            if (!turma) {
                return res.status(404).json({ error: "Turma não encontrada" });
            }

            // Verifica se o aluno existe
            const aluno = await Aluno.findByPk(alunoId);
            if (!aluno) {
                return res.status(404).json({ error: "Aluno não encontrado" });
            }

            // Remove o aluno da turma
            await turma.removeAluno(aluno);

            res.status(200).json({ message: "Aluno removido da turma com sucesso!" });
        } catch (error) {
            console.error("Erro ao remover aluno da turma:", error);
            res.status(500).json({
                error: "Erro ao remover aluno da turma",
                details: error.message,
            });
        }
    },
};

module.exports = Turma_AlunoController;
