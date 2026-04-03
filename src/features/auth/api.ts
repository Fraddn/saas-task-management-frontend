import { apiRequest } from "@/lib/api/client";
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RefreshSessionResponse,
  RegisterCompanyRequest,
  RegisterCompanyResponse,
} from "./types";

export async function login(
  request: LoginRequest
): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: request,
  });
}

export async function getCurrentUser(): Promise<AuthUser> {
  return apiRequest<AuthUser>("/api/auth/me", {
    method: "GET",
  });
}

export async function refreshSession(): Promise<RefreshSessionResponse> {
  return apiRequest<RefreshSessionResponse>("/api/auth/refresh", {
    method: "POST",
  });
}

export async function logout(): Promise<void> {
  await apiRequest<void>("/api/auth/logout", {
    method: "POST",
  });
}

export async function registerCompany(
  request: RegisterCompanyRequest
): Promise<RegisterCompanyResponse> {
  return apiRequest<RegisterCompanyResponse>("/api/companies", {
    method: "POST",
    body: request,
  });
}