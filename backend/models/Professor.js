const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const validarCpf = require("../utils/validarCpf");

const Professor = sequelize.define(
  "Professor",
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
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "O CPF informado já está em uso." },
      validate: {
        notEmpty: { msg: "O campo 'CPF' é obrigatório e não pode estar vazio." },
        len: {
          args: [11, 11],
          msg: "O campo 'CPF' deve conter exatamente 11 caracteres numéricos.",
        },
        isValidCPF(value) {
          if (!validarCpf(value)) {
            throw new Error("CPF inválido.");
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "O email informado já está em uso." },
      validate: {
        notEmpty: { msg: "O campo 'email' é obrigatório e não pode estar vazio." },
        isEmail: { msg: "O campo 'email' deve conter um endereço de email válido." },
      },
    },
    titulacao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo 'titulação' é obrigatório e não pode estar vazio." },
        len: {
          args: [3, 50],
          msg: "O campo 'titulação' deve ter entre 3 e 50 caracteres.",
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
    tableName: "professores",
    timestamps: true, // Garantir que createdAt e updatedAt estejam presentes
    freezeTableName: true, // Nome da tabela não será alterado
  }
);

module.exports = Professor;
