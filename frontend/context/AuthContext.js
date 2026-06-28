"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

/**
 * Shape of the user object stored in context:
 * { id, name, email, avatar? }
 *
 * Replace the mock implementations of login / register / logout
 * with real API calls once the backend is ready.
 */
export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while hydrating from storage

  // ── Hydrate from localStorage on mount ──────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mcq_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // corrupted storage — ignore
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Helpers ─────────────────────────────────────────
  const persist = (userData) => {
    setUser(userData);
    localStorage.setItem("mcq_user", JSON.stringify(userData));
  };

  const clear = () => {
    setUser(null);
    localStorage.removeItem("mcq_user");
  };

  // ── Auth actions ────────────────────────────────────

  /**
   * Log in with email + password.
   * Returns { ok: true } or { ok: false, message: string }
   */
  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      // ── Replace with real API call ──
      // const res = await fetch("/api/v1/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await res.json();
      // if (!res.ok) return { ok: false, message: data.message };
      // persist(data.user);
      // return { ok: true };

      // Mock — accept any non-empty credentials
      await new Promise((r) => setTimeout(r, 600)); // fake latency
      if (!email || !password) return { ok: false, message: "Please fill in all fields." };

      const mockUser = {
        id: "usr_mock_001",
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        avatar: null,
      };
      persist(mockUser);
      return { ok: true };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Register a new account.
   * Returns { ok: true } or { ok: false, message: string }
   */
  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      // ── Replace with real API call ──
      // const res = await fetch("/api/v1/auth/register", { ... });

      // Mock
      await new Promise((r) => setTimeout(r, 700));
      if (!name || !email || !password) return { ok: false, message: "Please fill in all fields." };

      const mockUser = { id: "usr_mock_002", name, email, avatar: null };
      persist(mockUser);
      return { ok: true };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Log out the current user and redirect to the landing page.
   */
  const logout = useCallback(() => {
    clear();
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook — throws if used outside AuthProvider */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
