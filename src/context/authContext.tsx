import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("username");
      setUserName(name);
      setIsAuthenticated(!!token);
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        userName,
        setUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
