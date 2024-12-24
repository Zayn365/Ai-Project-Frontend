"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
type user = {
  username: string;
  id: Number;
  password: string;
  email: string;
} | null;
interface AppContextType {
  user: user;
  setUser: (user: user | null) => void;
  authToken: string | null;
  setAuthtoken: (token: string | null) => void;
}

const AppContextValue = createContext<AppContextType | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getUser = Cookies.get("user");
  const getAuthToken = Cookies.get("authToken");
  const [user, setUser] = useState<string | null>(
    getUser ? JSON.parse(getUser) : null
  );
  const [authToken, setAuthtoken] = useState<string | null>(
    getAuthToken ? getAuthToken : null
  );

  const values = {
    user,
    setUser,
    authToken,
    setAuthtoken,
  };
  return (
    // @ts-ignore
    <AppContextValue.Provider value={values}>
      {children}
    </AppContextValue.Provider>
  );
};

// Hook to access the context in other components
export const useAppContext = () => {
  const context = useContext(AppContextValue);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};

export default AppContextProvider;
