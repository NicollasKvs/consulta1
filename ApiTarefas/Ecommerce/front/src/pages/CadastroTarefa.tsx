import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CadastroTarefa: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleCadastrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!token) {
      setErro('Você precisa estar logado.');
      return;
    }

    try {
      await api.post('/tarefas/cadastrar', { titulo }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/home');
    } catch {
      setErro('Erro ao cadastrar tarefa.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Cadastrar Tarefa</h2>
      <form onSubmit={handleCadastrar}>
        <div>
          <label>Título:</label><br />
          <input
            type="text"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            required
            autoFocus
          />
        </div>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button style={{ marginTop: 20 }} type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroTarefa;
