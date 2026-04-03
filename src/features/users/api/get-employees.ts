import { apiRequest } from "@/lib/api/client";
import type { User } from "../types/user.types";

export async function getEmployees(): Promise<User[]> {
  const result = await apiRequest<{ items: User[] }>(
    "/api/users?page=1&pageSize=200"
  );
  return result.items;
}
