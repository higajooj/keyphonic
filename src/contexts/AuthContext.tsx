"use client";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";

interface LoginInput {
  email: string;
  password: string;
}

interface AuthContextType {
  logout: () => void;
  login: (input: LoginInput) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (input: LoginInput) => {
    console.log(input);
    setIsAuthenticated(true);
    push("/admin/orders");
  };

  const logout = () => {
    console.log("logout");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
