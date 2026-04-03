import { createContext } from "react";
import type { AuthState } from "./auth-state";
import type { AuthUser } from "./types";

export type AuthContextValue = AuthState & {
  setAuthenticated: (user: AuthUser) => void;
  setUnauthenticated: () => void;
  setLoading: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);