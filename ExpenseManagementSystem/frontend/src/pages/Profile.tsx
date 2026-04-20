import React, { useEffect, useState } from 'react';
import { auth as apiAuth } from '../api';
import { User as UserIcon, Mail, DollarSign, Lock, Save, CheckCircle } from 'lucide-react';
import type { User } from '../types';

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    salary: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiAuth.getMe();
        setUser(res.data);
        setFormData({
          full_name: res.data.full_name || '',
          email: res.data.email || '',
          salary: res.data.salary.toString() || '0',
          password: ''
        });
      } catch (err) {
        console.error("Error fetching user", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    
    try {
      const data: Partial<User> & { password?: string } = {
        full_name: formData.full_name,
        email: formData.email,
        salary: parseFloat(formData.salary)
      };
      if (formData.password) data.password = formData.password;

      await apiAuth.updateMe(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Settings</h1>
      </header>

      <div className="profile-layout">
        <div className="glass-card profile-main animate-slide-up">
          <div className="profile-header">
            <div className="avatar-large">
              {formData.full_name.charAt(0) || <UserIcon size={40} />}
            </div>
            <div>
              <h2>{formData.full_name || 'User'}</h2>
              <p className="text-muted">{formData.email}</p>
            </div>
          </div>

          {success && (
            <div className="success-banner">
              <CheckCircle size={18} />
              <span>Profile updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="input-grid">
                <div className="input-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <UserIcon className="input-icon" size={18} />
                    <input 
                      type="text" 
                      className="input-field" 
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
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
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Financial Settings</h3>
              <div className="input-group">
                <label>Monthly Salary ($)</label>
                <div className="input-wrapper">
                  <DollarSign className="input-icon" size={18} />
                  <input 
                    type="number" 
                    className="input-field" 
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  />
                </div>
                <p className="text-muted small mt-2">This is used to calculate your remaining balance and savings rate.</p>
              </div>
            </div>

            <div className="form-section">
              <h3>Security</h3>
              <div className="input-group">
                <label>New Password (Leave blank to keep current)</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input 
                    type="password" 
                    className="input-field" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>
                <Save size={18} />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>

        <div className="profile-sidebar">
          <div className="glass-card stat-card mb-4">
            <h4 className="text-muted mb-4">Account Summary</h4>
            <div className="summary-item">
              <span>Member Since</span>
              <span>{user ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="summary-item">
              <span>Total Salary</span>
              <span className="text-accent">${(parseFloat(formData.salary) || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; }
        .profile-header { display: flex; align-items: center; gap: 24px; margin-bottom: 40px; padding-bottom: 32px; border-bottom: 1px solid var(--border); }
        .avatar-large { width: 80px; height: 80px; border-radius: 24px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 800; color: white; box-shadow: 0 8px 16px rgba(99, 102, 241, 0.2); }
        .form-section { margin-bottom: 40px; }
        .form-section h3 { margin-bottom: 20px; font-size: 18px; }
        .input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .input-wrapper { position: relative; }
        .input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .input-field { padding-left: 44px; }
        .summary-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 14px; }
        .summary-item:last-child { border-bottom: none; }
        .success-banner { background: rgba(16, 185, 129, 0.1); color: var(--accent); padding: 16px; border-radius: 12px; margin-bottom: 32px; display: flex; align-items: center; gap: 12px; border: 1px solid rgba(16, 185, 129, 0.2); }
        .mt-2 { margin-top: 8px; }
        @media (max-width: 1024px) { .profile-layout { grid-template-columns: 1fr; } .input-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default Profile;
