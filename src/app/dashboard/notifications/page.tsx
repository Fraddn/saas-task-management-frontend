"use client";

import { useEffect } from "react";
import { useNotificationsContext } from "@/features/notifications/unread-count-context";
import { NotificationsList } from "@/features/notifications/components/notifications-list";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotificationsPage() {
  const { notifications, isLoading, markAllRead } =
    useNotificationsContext();

  // Auto-mark all as read when the page is opened
  useEffect(() => {
    void markAllRead();
  }, [markAllRead]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay updated with recent activity."
      />

      {isLoading ? (
        <LoadingState message="Loading notifications..." />
      ) : notifications.length === 0 ? (
        <EmptyState
          title="No notifications"
          description="You're all caught up."
        />
      ) : (
        <NotificationsList notifications={notifications} />
      )}
    </div>
  );
}
