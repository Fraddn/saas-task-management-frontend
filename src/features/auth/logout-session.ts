import { logout } from "./api";
import { clearToken } from "@/lib/auth/token-storage";

export async function logoutSession() {
  try {
    await logout();
  } finally {
    clearToken();
  }
}