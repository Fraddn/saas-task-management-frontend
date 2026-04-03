"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useNotificationsContext } from "@/features/notifications/unread-count-context";

export function NotificationBell() {
  const {
    notifications,
    unreadCount,
    countLoaded,
    isPanelOpen,
    togglePanel,
    closePanel,
    markRead,
    markAllRead,
  } = useNotificationsContext();

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close panel on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        closePanel();
      }
    }

    if (isPanelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isPanelOpen, closePanel]);

  const recentNotifications = notifications.slice(0, 8);

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        ref={buttonRef}
        onClick={togglePanel}
        className="relative flex items-center justify-center rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        aria-label="Notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {/* Badge */}
        {countLoaded && unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {isPanelOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 top-full z-50 mt-2 w-96 rounded-xl border border-gray-200 bg-white shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={() => void markAllRead()}
                className="text-xs font-medium text-blue-600 transition hover:text-blue-700"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notification items */}
          <div className="max-h-96 overflow-y-auto">
            {recentNotifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-400">
                No notifications yet
              </div>
            ) : (
              recentNotifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => {
                    if (!notification.isRead) {
                      void markRead(notification.id);
                    }
                  }}
                  className={`block w-full border-b border-gray-50 px-4 py-3 text-left transition last:border-0 hover:bg-gray-50 ${
                    !notification.isRead ? "bg-blue-50/40" : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!notification.isRead && (
                      <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    )}
                    <div className={`min-w-0 flex-1 ${notification.isRead ? "pl-4" : ""}`}>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {notification.title}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-[10px] text-gray-400">
                        {new Date(notification.createdAtUtc).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-4 py-2.5 text-center">
            <Link
              href="/dashboard/notifications"
              onClick={closePanel}
              className="text-xs font-medium text-blue-600 transition hover:text-blue-700"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
