import { apiRequest } from "@/lib/api/client";
import type { User } from "../types/user.types";

export async function getUser(userId: string): Promise<User> {
  return apiRequest<User>(`/api/users/${userId}`);
}
