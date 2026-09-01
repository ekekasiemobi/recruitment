"use client";

import {createContext, ReactNode, useContext, useEffect, useState,} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {AuthUser, getCurrentUser, login as loginAPI, signup as signupAPI,} from "../lib/auth";

interface Signup {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: "Job seeker" | "employer";
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
    data: Signup
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
  const router = useRouter();

  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

 

  useEffect(() => {
    const checkAuthentication = () => {
      const token =
        localStorage.getItem("accessToken");

      const storedUser =
        localStorage.getItem("user");

     
      if (!token || !storedUser) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const parsedUser =
          JSON.parse(storedUser);

        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(
          "Failed to restore authentication:",
          error
        );

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        localStorage.removeItem("user");

        document.cookie =
          "accessToken=; path=/; max-age=0";

        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
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

      
      document.cookie =
        `accessToken=${data.accessToken}; ` +
        `path=/; ` +
        `max-age=${60 * 60 * 24 * 7}; ` +
        `samesite=lax`;

     

      const currentUser =
        await getCurrentUser();

      

      setUser(currentUser);

      localStorage.setItem(
        "user",
        JSON.stringify(currentUser)
      );

      

      setIsAuthenticated(true);

      toast.success(
        `Welcome back, ${currentUser.firstName}!`
      );

      return currentUser;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Invalid username or password.";

      toast.error(message);

      

      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );

      localStorage.removeItem("user");

      document.cookie =
        "accessToken=; path=/; max-age=0";

      setUser(null);
      setIsAuthenticated(false);

      throw error;
    }
  };

  

  const signup = async (
    data: Signup
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

   
    document.cookie =
      "accessToken=; path=/; max-age=0";

   

    setUser(null);
    setIsAuthenticated(false);

    toast.success(
      "You have been logged out."
    );

   

    router.replace("/login");
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