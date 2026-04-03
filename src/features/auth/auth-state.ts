import type { AuthUser } from "./types";

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated";

export type AuthState = {
  user: AuthUser | null;
  status: AuthStatus;
};

export const initialAuthState: AuthState = {
  user: null,
  status: "loading",
};