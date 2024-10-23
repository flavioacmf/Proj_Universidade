import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../visualPage/CadastroAlunos.css';

const CadastroAlunos = () => {
  const navigate = useNavigate();
  const [idAluno, setIdAluno] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [cpfCNPJ, setCpfCNPJ] = useState('');
  const [inativo, setInativo] = useState(false);
  const [editingAluno, setEditingAluno] = useState(false);

  const [canCreate, setCanCreate] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canConsult, setCanConsult] = useState(true);

  const handleCreateNewAluno = async () => {
    try {
      await axios.post('http://localhost:5000/alunos', {
        nome,
        email,
        dataCadastro,
        cpfCNPJ,
        inativo,
      });
      clearFields();
    } catch (err) {
      console.error('Erro ao criar aluno:', err);
    }
  };

  const handleEditAluno = async () => {
    try {
      await axios.put(`http://localhost:5000/alunos/${idAluno}`, {
        nome,
        email,
        dataCadastro,
        cpfCNPJ,
        inativo,
      });
      clearFields();
    } catch (err) {
      console.error('Erro ao editar aluno:', err);
    }
  };

  const handleDeleteAluno = async () => {
    try {
      await axios.delete(`http://localhost:5000/alunos/${idAluno}`);
      clearFields();
    } catch (err) {
      console.error('Erro ao excluir aluno:', err);
    }
  };

  const handleConsultAlunos = () => {
    navigate('/consultas/ConsultaAlunos');
  };

  const clearFields = () => {
    setIdAluno(null);
    setNome('');
    setEmail('');
    setDataCadastro('');
    setCpfCNPJ('');
    setInativo(false);
    setCanEdit(false);
    setCanDelete(false);
  };

  return (
    <div className="container-cadastro-alunos">
      <h2>{editingAluno ? 'Editar Aluno' : 'Cadastro de Alunos'}</h2>
      <div className="form-cadastro">
        <div>
          <label>ID do Aluno:</label>
          <input type="text" value={idAluno || ''} disabled />
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
          <label>Data de Cadastro:</label>
          <input type="date" value={dataCadastro} onChange={(e) => setDataCadastro(e.target.value)} />
        </div>
        <div>
          <label>CPF ou CNPJ:</label>
          <input type="text" value={cpfCNPJ} onChange={(e) => setCpfCNPJ(e.target.value)} />
        </div>
        <div>
          <label>Inativo:</label>
          <input type="checkbox" checked={inativo} onChange={(e) => setInativo(e.target.checked)} />
        </div>
        <div className="buttons">
          <button type="button" onClick={handleCreateNewAluno} disabled={!canCreate}>Novo</button>
          <button type="button" onClick={handleEditAluno} disabled={!canEdit}>Editar</button>
          <button type="button" onClick={handleDeleteAluno} disabled={!canDelete}>Excluir</button>
          <button type="button" onClick={handleConsultAlunos} disabled={!canConsult}>Consultar</button>
        </div>
      </div>
    </div>
  );
};

export default CadastroAlunos;
