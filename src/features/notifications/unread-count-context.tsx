"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getUnreadCount } from "./api/get-unread-count";
import { getNotifications } from "./api/get-notifications";
import { markNotificationRead } from "./api/mark-notification-read";
import { markAllRead as markAllReadApi } from "./api/mark-all-read";
import {
  startConnection,
  getNotificationsConnection,
} from "@/lib/signalr/notifications-hub";
import type { HubConnection } from "@microsoft/signalr";
import { getToken } from "@/lib/auth/token-storage";
import type { Notification } from "./types/notification.types";

type NotificationsContextValue = {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  countLoaded: boolean;
  isPanelOpen: boolean;
  togglePanel: () => void;
  closePanel: () => void;
  markRead: (notificationId: string) => Promise<void>;
  markAllRead: () => Promise<void>;
  refetchNotifications: () => Promise<void>;
  refetchCount: () => Promise<void>;
};

const NotificationsContext = createContext<NotificationsContextValue>({
  notifications: [],
  unreadCount: 0,
  isLoading: true,
  countLoaded: false,
  isPanelOpen: false,
  togglePanel: () => {},
  closePanel: () => {},
  markRead: async () => {},
  markAllRead: async () => {},
  refetchNotifications: async () => {},
  refetchCount: async () => {},
});

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [countLoaded, setCountLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const notificationsRef = useRef(notifications);
  notificationsRef.current = notifications;

  const loadCount = useCallback(async () => {
    try {
      const data = await getUnreadCount();
      setUnreadCount(data.count);
      setCountLoaded(true);
    } catch {
      // Silently fail — non-critical UI
    }
  }, []);

  const loadNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch {
      // Silently fail for background loads
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial hydration from REST
  useEffect(() => {
    void loadCount();
    void loadNotifications();
  }, [loadCount, loadNotifications]);

  // SignalR connection
  useEffect(() => {
    let mounted = true;
    let connRef: HubConnection | null = null;

    function handleNotification(notification: Notification) {
      if (!mounted) return;

      setNotifications((prev) => {
        if (prev.some((n) => n.id === notification.id)) return prev;
        return [notification, ...prev];
      });

      if (!notification.isRead) {
        setUnreadCount((prev) => prev + 1);
      }
    }

    async function connect() {
      const token = getToken();
      if (!token) return;

      try {
        const conn = getNotificationsConnection();
        connRef = conn;
        conn.on("ReceiveNotification", handleNotification);
        await startConnection();
      } catch {
        // Connection failed — fall back to polling
      }
    }

    void connect();

    return () => {
      mounted = false;
      if (connRef) {
        connRef.off("ReceiveNotification", handleNotification);
      }
    };
  }, []);

  // Fallback polling for both count and notification list
  useEffect(() => {
    const countInterval = setInterval(() => void loadCount(), 5_000);
    const listInterval = setInterval(() => void loadNotifications(), 5_000);
    return () => {
      clearInterval(countInterval);
      clearInterval(listInterval);
    };
  }, [loadCount, loadNotifications]);

  const togglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  const markRead = useCallback(
    async (notificationId: string) => {
      const notification = notificationsRef.current.find(
        (n) => n.id === notificationId
      );
      const wasUnread = notification && !notification.isRead;

      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
      if (wasUnread) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      try {
        await markNotificationRead(notificationId);
      } catch {
        // Revert on failure
        if (wasUnread) {
          setNotifications((prev) =>
            prev.map((n) =>
              n.id === notificationId ? { ...n, isRead: false } : n
            )
          );
          setUnreadCount((prev) => prev + 1);
        }
      }
    },
    []
  );

  const markAllRead = useCallback(async () => {
    const previousNotifications = notificationsRef.current;
    const previousCount = unreadCount;

    // Optimistic update
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);

    try {
      await markAllReadApi();
    } catch {
      // Revert on failure
      setNotifications(previousNotifications);
      setUnreadCount(previousCount);
    }
  }, [unreadCount]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        countLoaded,
        isPanelOpen,
        togglePanel,
        closePanel,
        markRead,
        markAllRead,
        refetchNotifications: loadNotifications,
        refetchCount: loadCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useSharedUnreadCount() {
  const ctx = useContext(NotificationsContext);
  return { count: ctx.unreadCount, isLoading: !ctx.countLoaded, refetch: ctx.refetchCount };
}

export function useNotificationsContext() {
  return useContext(NotificationsContext);
}
