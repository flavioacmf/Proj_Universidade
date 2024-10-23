// models/Sala.js
const db = require('../Db');  // Corrigido o caminho para o arquivo de configuração do MySQL

const Sala = {
  // Função para buscar todas as salas
  async getAll() {
    try {
      const [rows] = await db.execute('SELECT * FROM salas');
      return rows;
    } catch (err) {
      throw new Error('Erro ao buscar salas: ' + err.message);
    }
  },

  // Função para criar uma nova sala
  async create(sala) {
    const { numeroSala, capacidade, dataCadastro } = sala;
    try {
      const [result] = await db.execute(
        'INSERT INTO salas (numeroSala, capacidade, dataCadastro) VALUES (?, ?, ?)',
        [numeroSala, capacidade, dataCadastro]
      );
      return result;
    } catch (err) {
      throw new Error('Erro ao criar sala: ' + err.message);
    }
  },

  // Função para editar uma sala
  async update(id, sala) {
    const { numeroSala, capacidade, dataCadastro } = sala;
    try {
      const [result] = await db.execute(
        'UPDATE salas SET numeroSala = ?, capacidade = ?, dataCadastro = ? WHERE id = ?',
        [numeroSala, capacidade, dataCadastro, id]
      );
      return result;
    } catch (err) {
      throw new Error('Erro ao editar sala: ' + err.message);
    }
  },

  // Função para excluir uma sala
  async delete(id) {
    try {
      const [result] = await db.execute('DELETE FROM salas WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error('Sala não encontrada'); // Verifica se a sala foi encontrada
      }
      return result;
    } catch (err) {
      throw new Error('Erro ao excluir sala: ' + err.message);
    }
  },
};

module.exports = Sala;
