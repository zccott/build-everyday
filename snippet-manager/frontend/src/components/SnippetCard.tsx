import React from 'react';

interface SnippetCardProps {
  snippet: {
    id: number;
    title: string;
    language: string;
    code: string;
  };
  onDelete: (id: number) => void;
}

const SnippetCard: React.FC<SnippetCardProps> = ({ snippet, onDelete }) => {
  return (
    <div className="snippet-card glass">
      <div className="snippet-header">
        <h3>{snippet.title}</h3>
        <span className="language-badge">{snippet.language}</span>
      </div>
      <pre>
        <code>{snippet.code}</code>
      </pre>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="danger" onClick={() => onDelete(snippet.id)}>Delete</button>
      </div>
    </div>
  );
};

export default SnippetCard;
