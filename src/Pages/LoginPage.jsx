import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import backgroundImage from '../assets/tata-steel.png';
import WelcomePopup from '../Components/WelcomePopup';
import authData from '../data/auth.json';

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

    // Find user in the hard-coded JSON file
    const user = authData.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Create user data object (without password)
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
      };

      // Use AppContext login function
      login(userData, `auth_token_${user.username}_${Date.now()}`);
      
      // Note: No longer using localStorage for auth (using sessionStorage for tab-specific sessions)
      
      setShowWelcome(true);
      setTimeout(() => {
        const basename = import.meta.env.PROD ? '/DAMSBF' : '';
        navigate(`${basename}/`);
      }, 2000);
    } else {
      setError('Invalid username or password. Please check your credentials.');
    }
  };

  return (
    <>
      <div
        className="h-screen w-screen bg-cover bg-center flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:w-96 border border-white/30">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 sm:mb-6 drop-shadow-lg">
            DAMS Login
          </h2>

          {error && (
            <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} autoComplete="off">
            <div className="mb-3 sm:mb-4">
              <input
                type="text"
                className="w-full p-2.5 sm:p-3 rounded-lg bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                required
                placeholder="Username"
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <input
                type="password"
                className="w-full p-2.5 sm:p-3 rounded-lg bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
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
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-full transition duration-200 text-sm sm:text-base"
            >
              Sign In
            </button>

            <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-blue-50/50 rounded-lg text-xs sm:text-sm text-white">
              <p className="font-semibold mb-1">Available Credentials:</p>
              <p className="break-words">Demo: <code className="bg-blue-200/50 px-1.5 py-0.5 rounded">0000</code> / <code className="bg-blue-200/50 px-1.5 py-0.5 rounded">0000</code></p>
              <p className="break-words">Admin: <code className="bg-blue-200/50 px-1.5 py-0.5 rounded">admin</code> / <code className="bg-blue-200/50 px-1.5 py-0.5 rounded">admin</code></p>
            </div>

            <p
              onClick={() => {
                const basename = import.meta.env.PROD ? '/DAMSBF' : '';
                navigate(`${basename}/reset`);
              }}
              className="text-center text-white mt-3 sm:mt-4 text-xs sm:text-sm underline cursor-pointer hover:text-blue-300"
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