import { apiRequest } from "@/lib/api/client";

export async function markNotificationRead(
  notificationId: string
): Promise<void> {
  return apiRequest<void>(`/api/notifications/${notificationId}/read`, {
    method: "PATCH",
  });
}
