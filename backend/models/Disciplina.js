const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Disciplina = sequelize.define(
  "Disciplina",
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
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "O código informado já está em uso.",
      },
      validate: {
        notEmpty: { msg: "O campo 'código' é obrigatório e não pode estar vazio." },
        len: {
          args: [1, 10],
          msg: "O campo 'código' deve ter no máximo 10 caracteres.",
        },
      },
    },
    periodo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo 'período' é obrigatório e não pode estar vazio." },
        len: {
          args: [3, 20],
          msg: "O campo 'período' deve ter entre 3 e 20 caracteres.",
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
    tableName: "disciplinas",
    timestamps: true, // Adicionado para registrar createdAt e updatedAt
    freezeTableName: true, // Garante que o nome da tabela não será alterado
  }
);

module.exports = Disciplina;
