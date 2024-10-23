const { DataTypes } = require('sequelize');
const sequelize = require('../Db');  // Agora importando a instância do Sequelize

const Disciplina = sequelize.define('Disciplina', {
  idDisciplina: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  cargaHoraria: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  inativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'Disciplinas',  // Nome da tabela no banco de dados
  timestamps: false,         // Desabilitar timestamps se não precisar
});

module.exports = Disciplina;
