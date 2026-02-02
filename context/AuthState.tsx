
"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  authStateL: number;
  setAuthState: React.Dispatch<React.SetStateAction<number>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authStateL, setAuthState] = useState(1);

  return (
    <AuthContext.Provider value={{ authStateL, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


