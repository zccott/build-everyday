import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth as apiAuth, categories as apiCategories } from '../api';
import { Mail, Lock, User, AlertCircle, TrendingUp } from 'lucide-react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiAuth.register({
        email,
        full_name: firstName,
        password,
        salary: parseFloat(salary) || 0
      });
      
      // Auto-login or just redirect to login
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="glass-card auth-card animate-slide-up">
        <div className="auth-header">
          <h1>Join ExpenseAI</h1>
          <p>Track, Analyze, and Save smarter</p>
        </div>

        {error && (
          <div className="error-badge">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input 
                type="text" 
                className="input-field" 
                placeholder="John Doe"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>

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
            <label>Monthly Salary (Optional)</label>
            <div className="input-wrapper">
              <TrendingUp className="input-icon" size={18} />
              <input 
                type="number" 
                className="input-field" 
                placeholder="5000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
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
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }
        .auth-card {
          width: 100%;
          max-width: 440px;
          padding: 48px;
        }
        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .input-wrapper { position: relative; }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .input-field { padding-left: 44px; }
        .w-full { width: 100%; margin-top: 24px; }
        .error-badge {
          background: rgba(255, 75, 75, 0.1);
          color: #ff4b4b;
          padding: 12px;
          border-radius: 12px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          border: 1px solid rgba(255, 75, 75, 0.2);
        }
        .auth-footer {
          text-align: center;
          margin-top: 32px;
          color: var(--text-muted);
          font-size: 14px;
        }
        .auth-footer a {
          color: var(--primary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Register;
