// Mock authentication data
export const mockUsers = {
  '0000': {
    id: 1,
    username: '0000',
    email: 'demo@tata.com',
    name: 'Demo User',
    role: 'operator',
    permissions: ['read', 'write'],
  },
  'admin': {
    id: 2,
    username: 'admin',
    email: 'admin@tata.com',
    name: 'Administrator',
    role: 'admin',
    permissions: ['read', 'write', 'admin'],
  },
};

export const mockAuthResponse = (username, password) => {
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === '0000' && password === '0000') {
        const user = mockUsers[username];
        resolve({
          success: true,
          token: 'mock_jwt_token_' + Date.now(),
          user: user,
          expiresIn: 3600,
        });
      } else if (username === 'admin' && password === 'admin') {
        const user = mockUsers[username];
        resolve({
          success: true,
          token: 'mock_jwt_token_admin_' + Date.now(),
          user: user,
          expiresIn: 3600,
        });
      } else {
        reject({
          success: false,
          message: 'Invalid username or password',
          status: 401,
        });
      }
    }, 500); // Simulate network delay
  });
};

export const mockLogoutResponse = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Logged out successfully',
      });
    }, 200);
  });
};
