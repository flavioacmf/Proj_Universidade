import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../visualPage/CadastroProfessores.css';

const CadastroProfessores = () => {
  const navigate = useNavigate();
  const [idProfessor, setIdProfessor] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [editingProfessor, setEditingProfessor] = useState(false);

  const [canCreate, setCanCreate] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canConsult, setCanConsult] = useState(true);

  const handleCreateNewProfessor = async () => {
    try {
      await axios.post('http://localhost:5000/professores', {
        nome,
        email,
        telefone,
        departamento,
      });
      clearFields();
    } catch (err) {
      console.error('Erro ao criar professor:', err);
    }
  };

  const handleEditProfessor = async () => {
    try {
      await axios.put(`http://localhost:5000/professores/${idProfessor}`, {
        nome,
        email,
        telefone,
        departamento,
      });
      clearFields();
    } catch (err) {
      console.error('Erro ao editar professor:', err);
    }
  };

  const handleDeleteProfessor = async () => {
    try {
      await axios.delete(`http://localhost:5000/professores/${idProfessor}`);
      clearFields();
    } catch (err) {
      console.error('Erro ao excluir professor:', err);
    }
  };

  const handleConsultProfessores = () => {
    navigate('/consultas/ConsultaProfessores');
  };

  const clearFields = () => {
    setIdProfessor(null);
    setNome('');
    setEmail('');
    setTelefone('');
    setDepartamento('');
    setCanEdit(false);
    setCanDelete(false);
  };

  return (
    <div className="container-cadastro-professores">
      <h2>{editingProfessor ? 'Editar Professor' : 'Cadastro de Professores'}</h2>
      <div className="form-cadastro">
        <div>
          <label>ID do Professor:</label>
          <input type="text" value={idProfessor || ''} disabled />
        </div>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Telefone:</label>
          <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
        <div>
          <label>Departamento:</label>
          <input type="text" value={departamento} onChange={(e) => setDepartamento(e.target.value)} />
        </div>
        <div className="buttons">
          <button type="button" onClick={handleCreateNewProfessor} disabled={!canCreate}>Novo</button>
          <button type="button" onClick={handleEditProfessor} disabled={!canEdit}>Editar</button>
          <button type="button" onClick={handleDeleteProfessor} disabled={!canDelete}>Excluir</button>
          <button type="button" onClick={handleConsultProfessores} disabled={!canConsult}>Consultar</button>
        </div>
      </div>
    </div>
  );
};

export default CadastroProfessores;
