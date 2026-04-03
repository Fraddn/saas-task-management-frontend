"use client";

import { useSharedUnreadCount } from "../unread-count-context";

export function UnreadCountBadge() {
  const { count, isLoading } = useSharedUnreadCount();

  if (isLoading || count === 0) return null;

  return (
    <span className="inline-flex items-center gap-1 text-sm text-gray-700">
      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-medium text-white">
        {count > 99 ? "99+" : count}
      </span>
    </span>
  );
}
