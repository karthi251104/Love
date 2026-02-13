import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  passwordVerified: boolean;
  dateVerified: boolean;
  verifyPassword: (answer: string) => boolean;
  verifyDate: (answer: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [dateVerified, setDateVerified] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const pwdAuth = localStorage.getItem('kn_pwd_auth');
    const dateAuth = localStorage.getItem('kn_date_auth');
    if (pwdAuth === 'true') {
      setPasswordVerified(true);
    }
    if (dateAuth === 'true') {
      setDateVerified(true);
    }
  }, []);

  const verifyPassword = (answer: string): boolean => {
    if (answer === '23') {
      setPasswordVerified(true);
      localStorage.setItem('kn_pwd_auth', 'true');
      return true;
    }
    return false;
  };

  const verifyDate = (answer: string): boolean => {
    // Accept various formats: "April 23 2023", "23 April 2023", "23/04/2023", "23-04-2023", "23.04.2023"
    const normalized = answer.toLowerCase().replace(/[,\s/.-]+/g, '');
    const validPatterns = [
      'april232023',
      '23april2023',
      '23042023',
      '2342023',
      'april2323',
      '23april23'
    ];
    
    if (validPatterns.some(pattern => normalized.includes(pattern))) {
      setDateVerified(true);
      localStorage.setItem('kn_date_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setPasswordVerified(false);
    setDateVerified(false);
    localStorage.removeItem('kn_pwd_auth');
    localStorage.removeItem('kn_date_auth');
  };

  const isAuthenticated = passwordVerified && dateVerified;

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      passwordVerified, 
      dateVerified, 
      verifyPassword, 
      verifyDate, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
