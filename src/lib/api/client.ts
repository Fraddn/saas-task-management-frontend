import { getToken } from "@/lib/auth/token-storage";
import { ApiError, type ProblemDetails } from "./errors";

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set.");
  }
  return url;
}

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const token = getToken();

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: options.method ?? "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (!response.ok) {
    let problemDetails: ProblemDetails | null = null;

    if (isJson) {
      try {
        const data = await response.json();
        if (
          data &&
          typeof data === "object" &&
          ("title" in data || "detail" in data || "status" in data)
        ) {
          problemDetails = data as ProblemDetails;
        }
      } catch {
        // JSON parse failed — leave problemDetails as null
      }
    }

    throw new ApiError(response.status, problemDetails);
  }

  if (response.status === 204 || !isJson) {
    return undefined as T;
  }

  return (await response.json()) as T;
}