import React, { createContext, useContext, useState } from 'react';
import { AuthContextType, AuthProviderProps, UserData } from '@/types';
import { storage } from '@/utils/storage';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const login = (data: UserData) => {
    storage.setUsername(data.username);
    storage.setRoomKey(data.roomKey);
    setUserData(data);
    setIsLoggedIn(true);
  };

  const logout = () => {
    storage.clearSession();
    setUserData(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
