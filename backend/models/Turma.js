const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Turma = sequelize.define(
  "Turma",
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
    dia_semana: {
      type: DataTypes.ENUM("Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo 'dia_semana' é obrigatório e não pode estar vazio." },
        isIn: {
          args: [["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]],
          msg: "O campo 'dia_semana' deve conter um dia válido da semana.",
        },
      },
    },
    horario_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: {
          args: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          msg: "O campo 'horario_inicio' deve estar no formato HH:MM.",
        },
        notEmpty: { msg: "O campo 'horario_inicio' é obrigatório e não pode estar vazio." },
      },
    },
    horario_termino: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: {
          args: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          msg: "O campo 'horario_termino' deve estar no formato HH:MM.",
        },
        notEmpty: { msg: "O campo 'horario_termino' é obrigatório e não pode estar vazio." },
      },
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    tableName: "turmas",
    timestamps: true,
    freezeTableName: true,
    hooks: {
      beforeCreate: (turma) => {
        if (turma.horario_inicio >= turma.horario_termino) {
          throw new Error("O horário de início deve ser anterior ao horário de término.");
        }
      },
      beforeUpdate: (turma) => {
        if (turma.horario_inicio >= turma.horario_termino) {
          throw new Error("O horário de início deve ser anterior ao horário de término.");
        }
      },
    },
  }
);

module.exports = Turma;
