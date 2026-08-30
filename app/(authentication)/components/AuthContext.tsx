"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  AuthUser,
  getCurrentUser,
  login as loginAPI,
  signup as signupAPI,
} from "../lib/auth";

interface SignupPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role : "Job seeker" | "employer";
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    username: string,
    password: string
  ) => Promise<AuthUser>;

  signup: (
    data: SignupPayload
  ) => Promise<any>;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const isAuthenticated = !!user;

  
  useEffect(() => {
    const restoreSession = async () => {
      const token =
        localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser =
          await getCurrentUser();

        setUser(currentUser);

        localStorage.setItem(
          "user",
          JSON.stringify(currentUser)
        );
      } catch {
        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        localStorage.removeItem("user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  
  const login = async (
    username: string,
    password: string
  ) => {
    try {
      const data = await loginAPI(
        username,
        password
      );

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );

      const currentUser =
        await getCurrentUser();

      setUser(currentUser);

      localStorage.setItem(
        "user",
        JSON.stringify(currentUser)
      );

      toast.success(
        `Welcome back, ${currentUser.firstName}!`
      );

      return currentUser;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Invalid username or password.";

      toast.error(message);

      throw error;
    }
  };

  
  const signup = async (
    data: SignupPayload
  ) => {
    try {
      const response =
        await signupAPI(data);

      toast.success(
        "Account created successfully!"
      );

      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to create account.";

      toast.error(message);

      throw error;
    }
  };

  
  const logout = () => {
    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );

    localStorage.removeItem("user");

    setUser(null);

    toast.success(
      "You have been logged out."
    );

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}