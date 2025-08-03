import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />;
      case 'signup':
        return <Signup onSwitchToLogin={() => setCurrentPage('login')} />;
      case 'dashboard':
        return (
          <Dashboard 
            user={currentUser} 
            onLogout={handleLogout}
            onNavigateToLeaderboard={() => setCurrentPage('leaderboard')}
          />
        );
      case 'leaderboard':
        return (
          <Leaderboard 
            onBack={() => setCurrentPage('dashboard')}
            currentUser={currentUser}
          />
        );
      default:
        return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />;
    }
  };

  return (
    <div className="app">
      {renderPage()}
    </div>
  );
}

export default App;