import { getCurrentUser, refreshSession } from "./api";
import { setToken, clearToken } from "@/lib/auth/token-storage";

export async function restoreSession() {
  try {
    return await getCurrentUser();
  } catch {
    try {
      const refreshResponse = await refreshSession();

      // store new access token
      setToken(refreshResponse.accessToken);

      // retry user fetch
      return await getCurrentUser();
    } catch {
      // session is invalid
      clearToken();
      throw new Error("Session restore failed");
    }
  }
}