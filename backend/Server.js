// server.js
const express = require('express');
const cors = require('cors');
const db = require('./Db'); // Conexão com o banco de dados

// Importando as rotas
const alunoRoutes = require('./routes/AlunoRoute');
const disciplinaRoutes = require('./routes/DisciplinaRoute');
const professorRoutes = require('./routes/ProfessorRoute');
const salaRoutes = require('./routes/SalaRoute');
const vwAlunosRoutes = require('./routes/VwAlunos');
const vwDisciplinasRoutes = require('./routes/VwDisciplinas');
const vwProfessoresRoutes = require('./routes/VwProfessores');
const vwSalasRoutes = require('./routes/VwSalas');
const vwTurmasRoutes = require('./routes/VwTurmas');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Substitui body-parser.json()

// Rotas - Adiciona todas as rotas
app.use('/api/alunos', alunoRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/salas', salaRoutes);

// Rotas para visualizações (Views)
app.use('/api/vwalunos', vwAlunosRoutes);
app.use('/api/vwdisciplinas', vwDisciplinasRoutes);
app.use('/api/vwprofessores', vwProfessoresRoutes);
app.use('/api/vwsalas', vwSalasRoutes);
app.use('/api/vwturmas', vwTurmasRoutes);

// Porta do servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
