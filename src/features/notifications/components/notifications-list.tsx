"use client";

import type { Notification } from "../types/notification.types";

type NotificationsListProps = {
  notifications: Notification[];
};

export function NotificationsList({
  notifications,
}: NotificationsListProps) {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`rounded-xl border p-5 shadow-sm transition ${
            notification.isRead
              ? "border-gray-200 bg-white"
              : "border-blue-200 bg-blue-50/60"
          }`}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-900">
                {notification.title}
              </p>
              {!notification.isRead && (
                <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
              )}
            </div>
            <p className="mt-1.5 text-sm text-gray-600">
              {notification.message}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {new Date(notification.createdAtUtc).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
