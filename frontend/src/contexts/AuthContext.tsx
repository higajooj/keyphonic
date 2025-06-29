"use client";

import { localStorageKeys } from "@/config/localStorageKeys";
import AuthService from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface LoginInput {
  email: string;
  password: string;
}

interface SignUpInput {
  name: string;
  email: string;
  password: string;
}
export interface UserType {
  id: string;
  name: string;
}
interface AuthContextType {
  logout: () => void;
  login: (input: LoginInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  isAuthenticated: boolean;
  user?: UserType | null;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<UserType | null | undefined>(undefined);

  useEffect(() => {
    const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    const stringUser = localStorage.getItem(localStorageKeys.USER);

    if (accessToken && stringUser) {
      try {
        const parsedUser = JSON.parse(stringUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Erro ao fazer parse do user no localStorage:", e);
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleStates = (data: { accessToken: string; user: UserType }) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(localStorageKeys.USER, JSON.stringify(data.user));
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const login = async (input: LoginInput) => {
    console.log(input);

    const data = await AuthService.login(input);
    handleStates(data);

    push("/admin");
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(localStorageKeys.USER);
    setUser(null);
    setIsAuthenticated(false);
  };

  const signUp = async (input: SignUpInput) => {
    console.log(input);

    const data = await AuthService.register(input);
    handleStates(data);

    push("/admin");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, signUp, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
