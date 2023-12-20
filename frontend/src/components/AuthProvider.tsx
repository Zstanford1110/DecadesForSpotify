import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { redirectToAuthCodeFlow } from "../utils/spotifyUtils";


interface AuthenticatorProps {
  children: ReactNode;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: AuthenticatorProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("AuthProvider - useEffect - Start");
    const checkAuthentication = () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        setIsAuthenticated(true);
        console.log("Authenticated via AuthProvider", isAuthenticated);
      }
    }

    checkAuthentication();
    console.log("AuthProvider - useEffect - End");
  }, []);


  const login = () => {
    redirectToAuthCodeFlow();
  }

  const logout = () => {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
