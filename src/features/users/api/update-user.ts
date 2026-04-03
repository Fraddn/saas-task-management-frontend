import { apiRequest } from "@/lib/api/client";
import type { UpdateUserRequest } from "../types/user.types";

export async function updateUser(
  userId: string,
  body: UpdateUserRequest
): Promise<void> {
  return apiRequest<void>(`/api/users/${userId}`, {
    method: "PATCH",
    body,
  });
}
