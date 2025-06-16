import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface Tarefa {
  id: number;
  titulo: string;
  status: string;
  criadoEm: string;
}

const Home: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    api.get('/tarefas/usuario', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTarefas(res.data))
      .catch(() => setErro('Erro ao carregar tarefas. Faça login novamente.'));
  }, [navigate, token]);

  const mudarStatus = async (id: number) => {
    try {
      await api.patch(`/tarefas/${id}/status`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Atualiza a lista
      const res = await api.get('/tarefas/usuario', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTarefas(res.data);
    } catch {
      setErro('Erro ao atualizar status da tarefa.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto' }}>
      <h2>Minhas Tarefas</h2>
      <button onClick={() => navigate('/cadastrar')}>Cadastrar Nova Tarefa</button>
      <button onClick={logout} style={{ marginLeft: 10 }}>Sair</button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id} style={{ marginTop: 15 }}>
            <strong>{tarefa.titulo}</strong> — Status: {tarefa.status} <br />
            <button onClick={() => mudarStatus(tarefa.id)}>Alterar Status</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
