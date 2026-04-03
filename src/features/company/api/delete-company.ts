import { apiRequest } from "@/lib/api/client";

export async function deleteCompany(): Promise<void> {
  return apiRequest<void>("/api/companies/me", {
    method: "DELETE",
  });
}
