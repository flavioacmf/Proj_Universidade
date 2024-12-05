const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Sala = sequelize.define(
  "Sala",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo 'nome' é obrigatório e não pode estar vazio." },
        len: {
          args: [3, 100],
          msg: "O campo 'nome' deve ter entre 3 e 100 caracteres.",
        },
      },
    },
    local: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo 'local' é obrigatório e não pode estar vazio." },
        len: {
          args: [3, 100],
          msg: "O campo 'local' deve ter entre 3 e 100 caracteres.",
        },
      },
    },
    capacidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "O campo 'capacidade' deve ser um número inteiro válido." },
        min: {
          args: [1],
          msg: "O campo 'capacidade' deve ser maior ou igual a 1.",
        },
      },
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    tableName: "salas",
    timestamps: true, // Para manter os campos createdAt e updatedAt
    freezeTableName: true, // Nome da tabela não será alterado
  }
);

module.exports = Sala;
