const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Aluno = sequelize.define(
  "Aluno",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O nome do aluno não pode ser vazio." }, // Validação para não permitir valores vazios
      },
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^[0-9]{11}$/, // Validação para CPF com 11 dígitos numéricos
          msg: "O CPF deve conter exatamente 11 dígitos numéricos.",
        },
        len: {
          args: [11, 11], // Garante comprimento de 11 caracteres
          msg: "O CPF deve ter exatamente 11 caracteres.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "O email informado é inválido." },
        notEmpty: { msg: "O email não pode ser vazio." },
      },
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: "A data de nascimento deve ser uma data válida no formato YYYY-MM-DD." },
        notEmpty: { msg: "A data de nascimento não pode ser vazia." },
      },
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    tableName: "alunos",
    timestamps: true, // Garantir que createdAt e updatedAt estejam presentes
    freezeTableName: true, // Nome da tabela não será alterado
  }
);

module.exports = Aluno;
