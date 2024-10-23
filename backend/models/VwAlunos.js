// models/VwAlunos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Db'); // Ajuste o caminho para o arquivo de conexão com o banco de dados

const VwAlunos = sequelize.define('VwAlunos', {  // Ajustado para "VwAlunos" sem sublinhado
  idAluno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataCadastro: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cpfCNPJ: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inativo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'vw_Alunos', // Nome da view no banco de dados
  timestamps: false // Desabilita os timestamps automáticos
});

// Método para pegar todos os registros da view
VwAlunos.getAllFromView = async () => {
  return await VwAlunos.findAll();  // Sequelize faz a consulta à view
};

module.exports = VwAlunos;
