import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import type { ReactNode } from "react";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  token: string | null;

  loading: boolean;

  isGuest: boolean;

  isAuthenticated: boolean;

  login: (
    userData: User,
    token?: string
  ) => void;

  logout: () => void;
  setUser: (
  user: User | null
) => void;

  setGuest: (
    value: boolean
  ) => void;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [isGuest, setIsGuest] =
    useState(false);

  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "campuscart-user"
      );

    const savedToken =
      localStorage.getItem(
        "token"
      );

    const savedGuest =
      localStorage.getItem(
        "campuscart-guest"
      );

    if (savedUser) {

      setUser(
        JSON.parse(savedUser)
      );

    }

    if (savedToken) {

      setToken(savedToken);

    }

    if (savedGuest === "true") {

      setIsGuest(true);

    }

    setLoading(false);

  }, []);

  const login = (
    userData: User,
    userToken?: string
  ) => {

    setUser(userData);

    if (userToken) {

      setToken(userToken);

      localStorage.setItem(
        "token",
        userToken
      );

    }

    setIsGuest(false);

    localStorage.setItem(
      "campuscart-user",
      JSON.stringify(userData)
    );

    localStorage.removeItem(
      "campuscart-guest"
    );

  };

const logout = async () => {

  await signOut(auth);

  setUser(null);

  setToken(null);

  setIsGuest(false);

  localStorage.removeItem("campuscart-user");

  localStorage.removeItem("token");

  localStorage.removeItem("campuscart-guest");

};
  const setGuest = (
    value: boolean
  ) => {

    setIsGuest(value);

    if (value) {

      localStorage.setItem(
        "campuscart-guest",
        "true"
      );

    }

    else {

      localStorage.removeItem(
        "campuscart-guest"
      );

    }

  };

  return (

    <AuthContext.Provider

      value={{

        user,

        token,

        loading,

        isGuest,

        isAuthenticated:
          !!user && !isGuest,

        login,
logout,
setGuest,
setUser,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used within AuthProvider"
    );

  }

  return context;

};