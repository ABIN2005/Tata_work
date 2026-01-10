import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import backgroundImage from '../assets/tata-steel.png';

const SignOutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAppContext();

  const handleConfirm = () => {
    logout();
    const basename = import.meta.env.PROD ? '/DAMSBF' : '';
    navigate(`${basename}/signedout`);
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:w-[300px] text-center border border-white/30">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
          alt="logout"
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4"
        />
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">Oh no! You're leaving?</h2>
        <p className="text-xs sm:text-sm text-white/90 mb-4 sm:mb-6">Are you sure you want to log out?</p>

        <div className="flex flex-col gap-2 sm:gap-3">
          <button
            onClick={handleCancel}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-2.5 rounded-full transition font-medium text-sm sm:text-base"
          >
            No, Take Me Back
          </button>
          <button
            onClick={handleConfirm}
            className="border border-blue-500 hover:bg-white/20 text-blue-100 py-2 sm:py-2.5 rounded-full transition font-medium text-sm sm:text-base"
          >
            Yes, Log Me Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutPage;