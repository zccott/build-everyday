import { useState } from 'react';
import { api } from './api';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
  };

  return (
    <div className="app-root">
      {!isLoggedIn ? (
        <AuthPage onLogin={handleLoginSuccess} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;

