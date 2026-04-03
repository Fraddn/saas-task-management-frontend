import { apiRequest } from "@/lib/api/client";
import type { Company } from "../types/company.types";

export async function getCompany(): Promise<Company> {
  return apiRequest<Company>("/api/companies/me");
}
