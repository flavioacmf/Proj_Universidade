// src/telas/consultas/ConsultaSalas.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConsultaSalas() {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controle de loading
  const [error, setError] = useState(null); // Estado para controle de erro

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vwSalas'); // Altere a URL para a sua view
        setSalas(response.data);
      } catch (err) {
        setError('Erro ao carregar as salas');
        console.error('Erro ao buscar salas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalas();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Mensagem de loading
  }

  if (error) {
    return <div>{error}</div>; // Mensagem de erro
  }

  return (
    <div>
      <h2>Consulta de Salas</h2>
      <table>
        <thead>
          <tr>
            <th>Número da Sala</th>
            <th>Capacidade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {salas.map((sala) => (
            <tr key={sala.id}>
              <td>{sala.numeroSala}</td>
              <td>{sala.capacidade}</td>
              <td>{sala.isActive ? 'Ativa' : 'Inativa'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultaSalas;
