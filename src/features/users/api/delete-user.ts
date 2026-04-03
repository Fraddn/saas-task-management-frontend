import { apiRequest } from "@/lib/api/client";

export async function deleteUser(userId: string): Promise<void> {
  return apiRequest<void>(`/api/users/${userId}`, {
    method: "DELETE",
  });
}
