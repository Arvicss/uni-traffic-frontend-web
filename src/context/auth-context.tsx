"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import type { LoginResponse, User } from "@/lib/types";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AxiosError, AxiosResponse } from "axios";
import api from "@/api/axios";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signInWithGoogle: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    getLoggedInUser();
  }, []);

  const getLoggedInUser = async () => {
    try {
      const response = await api.get("/user/me");
      if (response.status !== 200) {
        return;
      }
      const responseData = response.data;
      if (responseData) {
        setUser(responseData as User);
        return;
      }

      router.replace("/auth/login");
    } catch (error) {
      console.log(error);
      router.replace("/auth/login");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (token: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const response: AxiosResponse = await api.post("/auth/google", {
        token: token,
        clientType: "WEB"
      });
      if (response.status !== 200) return;

      const { user }: LoginResponse = response.data;

      setUser(user);

      router.replace("/dashboard");
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);

      setError("Internal Server Error: ");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    setError(null);
    if (username.length === 0 || password.length === 0) {
      setError("Provide username or password");
      return;
    }

    try {
      setIsLoading(true);

      const response: AxiosResponse = await api.post("/auth/login", {
        username,
        password
      });
      if (response.status !== 200) {
        setError("Unknown response");
        return;
      }

      const { user }: LoginResponse = response.data;

      setUser(user);

      router.replace("/dashboard");
    } catch (err) {
      const error = err as AxiosError;

      if (error.status === 401) {
        setError("Invalid login, please try again");
        setUser(null);
        return;
      }

      setError("Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await api.post("/auth/logout");
      if (response.status !== 200) {
        setError("Something went wrong logging out");
      }

      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      router.replace("/auth/login");
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
      <AuthContext.Provider value={{ user, login, signInWithGoogle, logout, error, isLoading }}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
