const db = require('../models/dbConnection');

exports.createAluno = (req, res) => {
  const { nome, idade } = req.body;
  const sql = 'INSERT INTO Alunos (nome, idade) VALUES (?, ?)';
  db.query(sql, [nome, idade], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Aluno inserido com sucesso!');
  });
};
