import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import axios from 'axios';

interface RegisterFormProps {
  onRegister: (name: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent default form submission
    
    setError('');

    if (!email.includes('@') || !email.includes('.com')) {
      setError('Invalid email format. Please enter a valid email.');
      return;
  }

  // ✅ Password Validation: Check if it's at least 8 characters long
    if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/register', { name, email, password });

      if (response.status === 201) {
        onRegister(name, email, password);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. You might have already have a profile. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Create Account</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Choose a password"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
