const { DataTypes } = require('sequelize');
const sequelize = require('../Db');

const VwSalas = sequelize.define('vw_Salas', {
  idSala: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  inativo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'vw_Salas',
  timestamps: false
});

module.exports = VwSalas;
