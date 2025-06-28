"use client";

import { localStorageKeys } from "@/config/localStorageKeys";
import AuthService from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";

interface LoginInput {
  email: string;
  password: string;
}

interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  logout: () => void;
  login: (input: LoginInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (input: LoginInput) => {
    console.log(input);
    const data = await AuthService.login(input);
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, data.accessToken);

    setIsAuthenticated(true);
    push("/admin");
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setIsAuthenticated(false);
  };

  const signUp = async (input: SignUpInput) => {
    console.log(input);
    const data = await AuthService.register(input);
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, data.accessToken);

    setIsAuthenticated(true);
    push("/admin");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
