import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../visualPage/CadastroSalas.css'; // Arquivo CSS para o layout

const CadastroSalas = () => {
  const navigate = useNavigate();

  // Estado para controlar os dados da sala
  const [idSala, setIdSala] = useState(null);  // Adicionando o campo ID
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [editingSala, setEditingSala] = useState(false);

  // Estados para controlar habilitação de botões
  const [canCreate, setCanCreate] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canConsult, setCanConsult] = useState(true);

  // Função para buscar salas cadastradas no backend
  const fetchSalas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/salas');
      const salas = response.data;
      // Aqui você pode adicionar lógica adicional se necessário
    } catch (err) {
      console.error('Erro ao consultar salas:', err);
    }
  };

  // Função para criar nova sala
  const handleCreateNewSala = async () => {
    try {
      await axios.post('http://localhost:5000/salas', {
        nome,
        capacidade,
      });
      clearFields();  // Limpa os campos
    } catch (err) {
      console.error('Erro ao criar sala:', err);
    }
  };

  // Função para editar sala
  const handleEditSala = async () => {
    try {
      await axios.put(`http://localhost:5000/salas/${idSala}`, {
        nome,
        capacidade,
      });
      clearFields();
    } catch (err) {
      console.error('Erro ao editar sala:', err);
    }
  };

  // Função para excluir sala
  const handleDeleteSala = async () => {
    try {
      await axios.delete(`http://localhost:5000/salas/${idSala}`);
      clearFields();
    } catch (err) {
      console.error('Erro ao excluir sala:', err);
    }
  };

  // Função para consultar salas
  const handleConsultSalas = () => {
    navigate('/consultas/ConsultaSalas');
  };

  // Função para limpar os campos do formulário
  const clearFields = () => {
    setIdSala(null);
    setNome('');
    setCapacidade('');
    setCanEdit(false);
    setCanDelete(false);
  };

  return (
    <div className="container-cadastro-salas">
      <h2>{editingSala ? 'Editar Sala' : 'Cadastro de Salas'}</h2>
      
      <div className="form-cadastro">
        <div>
          <label>ID da Sala:</label>
          <input
            type="text"
            value={idSala || ''}
            disabled
          />
        </div>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label>Capacidade:</label>
          <input
            type="number"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
          />
        </div>

        <div className="buttons">
          <button onClick={handleCreateNewSala} disabled={!canCreate}>Novo</button>
          <button onClick={handleEditSala} disabled={!canEdit}>Editar</button>
          <button onClick={handleDeleteSala} disabled={!canDelete}>Excluir</button>
          <button onClick={handleConsultSalas} disabled={!canConsult}>Consultar</button>
        </div>
      </div>
    </div>
  );
};

export default CadastroSalas;
