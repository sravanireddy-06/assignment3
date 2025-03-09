import React, { useState } from 'react';
import { Header } from './components/Header';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import type { AuthState } from './types';

type AppView = 'login' | 'register';

function App() {
  const [auth, setAuth] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [currentView, setCurrentView] = useState<AppView>('login');

  const handleLogin = (email: string, password: string) => {
    setAuth({
      user: { id: '1', email, name: 'John Doe' },
      isAuthenticated: true,
    });
    console.log('Login successful');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    setAuth({
      user: { id: '1', email, name },
      isAuthenticated: true,
    });
    console.log('Registration successful');
  };

  const handleLogout = () => {
    setAuth({ user: null, isAuthenticated: false });
    setCurrentView('login');
    console.log('Logged out');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentView('register')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} isAuthenticated={auth.isAuthenticated} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!auth.isAuthenticated ? (
          <div className="flex items-center justify-center">
            {renderContent()}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Welcome!</h2>
            <p>You are successfully logged in.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;