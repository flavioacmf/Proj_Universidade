const express = require('express');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes'); // Importar outras rotas conforme necessário

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', alunoRoutes); // Definir prefixo para rotas de alunos
app.use('/api', disciplinaRoutes); // Definir prefixo para outras rotas

// Porta em que o servidor irá rodar
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
