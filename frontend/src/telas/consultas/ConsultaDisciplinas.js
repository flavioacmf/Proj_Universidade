// src/telas/consultas/ConsultaDisciplinas.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConsultaDisciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controle de loading
  const [error, setError] = useState(null); // Estado para controle de erro

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vwdisciplinas'); // Alterar para a rota correta
        setDisciplinas(response.data);
      } catch (err) {
        setError('Erro ao carregar as disciplinas');
        console.error('Erro ao buscar disciplinas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisciplinas();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Mensagem de loading
  }

  if (error) {
    return <div>{error}</div>; // Mensagem de erro
  }

  return (
    <div>
      <h2>Consulta de Disciplinas</h2>
      <table>
        <thead>
          <tr>
            <th>Nome da Disciplina</th>
            <th>Professor Responsável</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((disciplina) => (
            <tr key={disciplina.id}>
              <td>{disciplina.nome}</td>
              <td>{disciplina.professorResponsavel}</td>
              <td>{disciplina.isActive ? 'Ativa' : 'Inativa'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultaDisciplinas;
