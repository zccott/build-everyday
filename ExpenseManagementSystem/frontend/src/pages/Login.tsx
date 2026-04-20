import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth as apiAuth } from '../api';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { AxiosError } from 'axios';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await apiAuth.login(formData);
      localStorage.setItem('token', response.data.access_token);
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(axiosError.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="glass-card auth-card animate-slide-up">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Login to manage your expenses</p>
        </div>

        {error && (
          <div className="error-badge">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                className="input-field" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                className="input-field" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Logging in...' : (
              <>
                <span>Login</span>
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>

      <style>{`
        .auth-page { display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
        .auth-card { width: 100%; max-width: 440px; padding: 48px; }
        .auth-header { text-align: center; margin-bottom: 32px; }
        .auth-header h1 { font-size: 32px; margin-bottom: 8px; }
        .auth-header p { color: var(--text-muted); }
        .input-wrapper { position: relative; }
        .input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .input-field { padding-left: 44px; }
        .w-full { width: 100%; margin-top: 24px; }
        .error-badge { background: rgba(255, 75, 75, 0.1); color: #ff4b4b; padding: 12px; border-radius: 12px; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; font-size: 14px; border: 1px solid rgba(255, 75, 75, 0.2); }
        .auth-footer { text-align: center; margin-top: 32px; color: var(--text-muted); font-size: 14px; }
        .auth-footer a { color: var(--primary); font-weight: 600; }
        .auth-footer a:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default Login;
