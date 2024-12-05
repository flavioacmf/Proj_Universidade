// models/index.js
const sequelize = require("../config/database"); // Certifique-se de que o Sequelize está configurado
const Aluno = require("./Aluno");
const Professor = require("./Professor");
const Sala = require("./Sala");
const Disciplina = require("./Disciplina");
const Turma = require("./Turma");

// Definindo associações N:N com tabelas intermediárias e alias
Turma.belongsToMany(Aluno, { 
  through: "turma_alunos", 
  as: "Alunos", 
  foreignKey: "turmaId", 
  otherKey: "alunoId" 
});
Aluno.belongsToMany(Turma, { 
  through: "turma_alunos", 
  as: "Turmas", 
  foreignKey: "alunoId", 
  otherKey: "turmaId" 
});

Turma.belongsToMany(Professor, { 
  through: "turma_professores", 
  as: "Professores", 
  foreignKey: "turmaId", 
  otherKey: "professorId" 
});
Professor.belongsToMany(Turma, { 
  through: "turma_professores", 
  as: "Turmas", 
  foreignKey: "professorId", 
  otherKey: "turmaId" 
});

Turma.belongsToMany(Sala, { 
  through: "turma_salas", 
  as: "Salas", 
  foreignKey: "turmaId", 
  otherKey: "salaId" 
});
Sala.belongsToMany(Turma, { 
  through: "turma_salas", 
  as: "Turmas", 
  foreignKey: "salaId", 
  otherKey: "turmaId" 
});

Turma.belongsToMany(Disciplina, { 
  through: "turma_disciplinas", 
  as: "Disciplinas", 
  foreignKey: "turmaId", 
  otherKey: "disciplinaId" 
});
Disciplina.belongsToMany(Turma, { 
  through: "turma_disciplinas", 
  as: "Turmas", 
  foreignKey: "disciplinaId", 
  otherKey: "turmaId" 
});

// Exportando os modelos para serem usados em todo o sistema
module.exports = { sequelize, Aluno, Professor, Sala, Disciplina, Turma };
