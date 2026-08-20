import { createContext, useContext, useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchMe(token) {
    const response = await fetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) throw new Error("Session expired");

    const data = await response.json();
    setUser(data.user);
  }

  useEffect(() => {
    const token = localStorage.getItem("resumecraft_token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetchMe(token)
      .catch(() => {
        localStorage.removeItem("resumecraft_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("resumecraft_token", data.token);
    setUser(data.user);
    return data;
  }

  async function register(name, email, password) {
    const response = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Registration failed");

    localStorage.setItem("resumecraft_token", data.token);
    setUser(data.user);
    return data;
  }

  function logout() {
    localStorage.removeItem("resumecraft_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function getToken() {
  return localStorage.getItem("resumecraft_token");
}

export { API };
