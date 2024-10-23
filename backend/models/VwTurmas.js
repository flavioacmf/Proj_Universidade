const { DataTypes } = require('sequelize');
const sequelize = require('../Db');

const VwTurmas = sequelize.define('vw_Turmas', {
  idTurma: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  periodo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  hora_termino: {
    type: DataTypes.TIME,
    allowNull: false
  },
  inativo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  Sala_idSala: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Disciplina_idDisciplina: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Professor_idProfessor: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'vw_Turmas',
  timestamps: false
});

module.exports = VwTurmas;
