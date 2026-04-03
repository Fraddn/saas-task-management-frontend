import { apiRequest } from "@/lib/api/client";
import type { UnreadNotificationCount } from "../types/notification.types";

export async function getUnreadCount(): Promise<UnreadNotificationCount> {
  return apiRequest<UnreadNotificationCount>(
    "/api/notifications/unread-count"
  );
}
