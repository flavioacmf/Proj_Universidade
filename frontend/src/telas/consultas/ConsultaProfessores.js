// src/telas/consultas/ConsultaProfessores.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConsultaProfessores() {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controle de loading
  const [error, setError] = useState(null); // Estado para controle de erro

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vwprofessores'); // Altere a URL para o endpoint correto
        setProfessores(response.data);
      } catch (err) {
        setError('Erro ao carregar os professores');
        console.error('Erro ao buscar professores:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessores();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Mensagem de loading
  }

  if (error) {
    return <div>{error}</div>; // Mensagem de erro
  }

  return (
    <div>
      <h2>Consulta de Professores</h2>
      <table>
        <thead>
          <tr>
            <th>Nome do Professor</th>
            <th>Departamento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {professores.map((professor) => (
            <tr key={professor.id}>
              <td>{professor.nome}</td>
              <td>{professor.departamento}</td>
              <td>{professor.isActive ? 'Ativo' : 'Inativo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultaProfessores;
