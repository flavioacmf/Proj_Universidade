const { DataTypes } = require('sequelize');
const sequelize = require('../Db');

const VwDisciplinas = sequelize.define('vw_Disciplinas', {
  idDisciplina: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargaHoraria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  inativo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'vw_Disciplinas',
  timestamps: false
});

module.exports = VwDisciplinas;
