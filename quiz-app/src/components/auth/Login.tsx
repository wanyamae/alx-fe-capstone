import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, loginAsGuest } from '../../store/authSlice';
import type { RootState, AppDispatch } from '../../store';


const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const handleGuestLogin = () => {
    dispatch(loginAsGuest());
    navigate('/');
  }

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">Quiz App</span>
          <span className="text-gray-500 dark:text-gray-300 text-sm">Sign in to your account</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            Hint: <span className="font-mono">user</span> / <span className="font-mono">password</span>
          </div>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
            <span onClick={handleGuestLogin} className="font-bold text-blue-600 hover:underline cursor-pointer">
                Login as Guest
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
