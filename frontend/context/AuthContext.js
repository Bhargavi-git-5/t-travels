"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

// Wraps the whole app. Keeps the logged-in user + token in memory and
// localStorage, and exposes login/signup/logout so any component can
// call useAuth() instead of prop-drilling auth state everywhere.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("ttravels_token");
    if (storedToken) {
      setToken(storedToken);
      api
        .me(storedToken)
        .then(setUser)
        .catch(() => {
          localStorage.removeItem("ttravels_token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  function persist(data) {
    setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
    setToken(data.token);
    localStorage.setItem("ttravels_token", data.token);
  }

  async function login(email, password) {
    const data = await api.login({ email, password });
    persist(data);
    return data;
  }

  async function signup(payload) {
    const data = await api.signup(payload);
    persist(data);
    return data;
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ttravels_token");
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
