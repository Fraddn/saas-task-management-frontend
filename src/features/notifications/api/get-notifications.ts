import { apiRequest } from "@/lib/api/client";
import type { Notification } from "../types/notification.types";

export async function getNotifications(): Promise<Notification[]> {
  return apiRequest<Notification[]>("/api/notifications");
}
