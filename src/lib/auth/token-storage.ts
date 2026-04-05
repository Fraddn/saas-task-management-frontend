const ACCESS_TOKEN_STORAGE_KEY = "taskflow_access_token";

let accessToken: string | null = null;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function setToken(token: string) {
  accessToken = token;

  if (canUseStorage()) {
    window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  }
}

export function getToken(): string | null {
  if (accessToken) {
    return accessToken;
  }

  if (canUseStorage()) {
    accessToken = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  return accessToken;
}

export function clearToken() {
  accessToken = null;

  if (canUseStorage()) {
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }
}