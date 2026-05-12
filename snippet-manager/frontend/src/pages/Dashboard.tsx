import React, { useState, useEffect } from 'react';
import { api } from '../api';
import SnippetCard from '../components/SnippetCard';
import SnippetForm from '../components/SnippetForm';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSnippets();
  }, [search]);

  const fetchSnippets = async () => {
    try {
      const data = await api.getSnippets(search);
      setSnippets(data);
    } catch (err: any) {
      console.error(err);
      if (err.message.includes('Unauthorized')) onLogout();
    }
  };

  const handleAddSnippet = async (snippet: { title: string; language: string; code: string }) => {
    try {
      await api.createSnippet(snippet);
      fetchSnippets();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteSnippet(id);
      fetchSnippets();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Snippet Manager</h1>
        <button className="secondary" onClick={onLogout}>Logout</button>
      </div>

      <SnippetForm onAdd={handleAddSnippet} />

      <div className="search-bar">
        <input 
          placeholder="Search snippets by title..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="glass"
          style={{ marginBottom: 0 }}
        />
      </div>

      {error && <p style={{ color: '#ff3b30', marginBottom: '1rem' }}>{error}</p>}

      <div className="snippet-list">
        {snippets.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.5 }}>No snippets found. Add your first one!</p>
        ) : (
          snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
