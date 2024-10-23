// alunoRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../Db'); // Conexão ao banco de dados (arquivo `db.js` separado para a conexão)

// Criar novo aluno
router.post('/alunos', (req, res) => {
  const { nome, email, dataCadastro, cpfCNPJ, inativo } = req.body;
  const query = 'INSERT INTO alunos (nome, email, dataCadastro, cpfCNPJ, inativo) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nome, email, dataCadastro, cpfCNPJ, inativo], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: 'Aluno cadastrado com sucesso!', alunoId: results.insertId });
  });
});

// Editar aluno
router.put('/alunos/:id', (req, res) => {
  const { nome, email, dataCadastro, cpfCNPJ, inativo } = req.body;
  const { id } = req.params;
  const query = 'UPDATE alunos SET nome = ?, email = ?, dataCadastro = ?, cpfCNPJ = ?, inativo = ? WHERE id = ?';
  db.query(query, [nome, email, dataCadastro, cpfCNPJ, inativo, id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Aluno atualizado com sucesso!' });
  });
});

// Excluir aluno
router.delete('/alunos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM alunos WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Aluno excluído com sucesso!' });
  });
});

// Consultar todos os alunos
router.get('/alunos', (req, res) => {
  const query = 'SELECT * FROM alunos';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

module.exports = router;
