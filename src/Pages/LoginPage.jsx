import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import backgroundImage from '../assets/tata-steel.png';
import WelcomePopup from '../Components/WelcomePopup';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const basename = import.meta.env.PROD ? '/DAMSBF' : '';
      navigate(`${basename}/`);
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (username === '0000' && password === '0000') {
      // Create user data object
      const userData = {
        id: 1,
        username: '0000',
        email: 'demo@tata.com',
        name: 'Demo User',
        role: 'operator',
      };

      // Use AppContext login function
      login(userData, 'demo_token_' + Date.now());
      
      // Also set legacy localStorage for compatibility
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      
      setShowWelcome(true);
      setTimeout(() => {
        const basename = import.meta.env.PROD ? '/DAMSBF' : '';
        navigate(`${basename}/`);
      }, 2000);
    } else {
      setError('Invalid username or password. Use 0000 / 0000');
    }
  };

  return (
    <>
      <div
        className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-2xl w-96 border border-white/30">
          <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
            DAMS Login
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} autoComplete="off">
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                required
                placeholder="Username"
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                className="w-full p-3 rounded-lg bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-200"
            >
              Sign In
            </button>

            <div className="mt-4 p-3 bg-blue-50/50 rounded-lg text-xs text-white">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>Username: <code className="bg-blue-200/50 px-1.5 py-0.5 rounded">0000</code></p>
              <p>Password: <code className="bg-blue-200/50 px-1.5 py-0.5 rounded">0000</code></p>
            </div>

            <p
              onClick={() => {
                const basename = import.meta.env.PROD ? '/DAMSBF' : '';
                navigate(`${basename}/reset`);
              }}
              className="text-center text-white mt-4 text-sm underline cursor-pointer hover:text-blue-300"
            >
              Forgot Password?
            </p>
          </form>
        </div>
      </div>

      {showWelcome && <WelcomePopup onClose={() => setShowWelcome(false)} />} {/* 🆕 */}
    </>
  );
};

export default LoginPage;