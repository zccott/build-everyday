import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, User, LogOut, Wallet } from 'lucide-react';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <nav className="navbar-glass">
      <div className="nav-brand">
        <Wallet size={32} className="brand-icon" />
        <span>ExpenseAI</span>
      </div>
      
      <div className="nav-links">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/expenses" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Receipt size={20} />
          <span>Expenses</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <User size={20} />
          <span>Profile</span>
        </NavLink>
      </div>

      <button onClick={onLogout} className="nav-logout">
        <LogOut size={20} />
        <span>Logout</span>
      </button>

      <style>{`
        .navbar-glass {
          position: fixed;
          left: 24px;
          top: 24px;
          bottom: 24px;
          width: 240px;
          background: var(--surface);
          backdrop-filter: var(--glass);
          border: 1px solid var(--border);
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          padding: 32px 20px;
          z-index: 100;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 48px;
          color: white;
        }

        .brand-icon {
          color: var(--primary);
        }

        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-radius: 16px;
          color: var(--text-muted);
          font-weight: 500;
          transition: var(--transition);
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .nav-item.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
        }

        .nav-logout {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-radius: 16px;
          color: #ff4b4b;
          font-weight: 500;
          background: none;
          margin-top: auto;
        }

        .nav-logout:hover {
          background: rgba(255, 75, 75, 0.1);
        }

        @media (max-width: 768px) {
          .navbar-glass {
            left: 0;
            right: 0;
            top: auto;
            bottom: 0;
            width: 100%;
            height: 70px;
            flex-direction: row;
            padding: 0 16px;
            border-radius: 0;
            border-left: none;
            border-right: none;
            border-bottom: none;
          }

          .nav-brand, .nav-logout span, .nav-item span {
            display: none;
          }

          .nav-links {
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
          }
          
          .nav-item {
            padding: 10px;
          }
          
          .nav-logout {
            margin-top: 0;
            padding: 10px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
