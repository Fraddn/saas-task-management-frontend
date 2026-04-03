import { apiRequest } from "@/lib/api/client";
import type { UpdateCompanyRequest, Company } from "../types/company.types";

export async function updateCompany(
  body: UpdateCompanyRequest
): Promise<Company> {
  return apiRequest<Company>("/api/companies/me", {
    method: "PATCH",
    body,
  });
}
