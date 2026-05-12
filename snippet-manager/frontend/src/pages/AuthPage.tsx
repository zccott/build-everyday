import React, { useState } from 'react';
import { api } from '../api';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLoginView) {
        await api.login(username, password);
      } else {
        await api.signup(username, password);
        await api.login(username, password);
      }
      onLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container glass">
      <h2>{isLoginView ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleAuth}>
        <input 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {error && <p style={{ color: '#ff3b30', marginBottom: '1rem' }}>{error}</p>}
        <button type="submit" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Processing...' : isLoginView ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', opacity: 0.8 }}>
        {isLoginView ? "Don't have an account? " : "Already have an account? "}
        <span 
          style={{ color: 'var(--accent-color)', cursor: 'pointer', fontWeight: 600 }}
          onClick={() => setIsLoginView(!isLoginView)}
        >
          {isLoginView ? 'Sign Up' : 'Login'}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
