import { apiRequest } from "@/lib/api/client";

export async function markAllRead(): Promise<void> {
  return apiRequest<void>("/api/notifications/read-all", {
    method: "PATCH",
  });
}
