// src/telas/consultas/ConsultaAlunos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConsultaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controle de loading
  const [error, setError] = useState(null); // Estado para controle de erro

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vwalunos'); // Alterar para a rota correta
        setAlunos(response.data);
      } catch (err) {
        setError('Erro ao carregar os alunos');
        console.error('Erro ao buscar alunos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Mensagem de loading
  }

  if (error) {
    return <div>{error}</div>; // Mensagem de erro
  }

  return (
    <div>
      <h1>Consulta de Cadastros de Alunos</h1>
      <table>
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>Idade</th>
            <th>Turma</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.idade}</td>
              <td>{aluno.turma}</td>
              <td>{aluno.isActive ? 'Ativo' : 'Inativo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultaAlunos;
