import React, { useState } from 'react';

interface SnippetFormProps {
  onAdd: (snippet: { title: string; language: string; code: string }) => void;
}

const SnippetForm: React.FC<SnippetFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !code) return;
    onAdd({ title, language, code });
    setTitle('');
    setCode('');
  };

  return (
    <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h2>Add New Snippet</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '1rem' }}>
          <input 
            placeholder="Title (e.g. Docker Run Postgres)" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="bash">Bash</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="sql">SQL</option>
          </select>
        </div>
        <textarea 
          placeholder="Paste your code here..." 
          rows={5} 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          required 
          style={{ resize: 'vertical' }}
        />
        <button type="submit">Add Snippet</button>
      </form>
    </div>
  );
};

export default SnippetForm;
