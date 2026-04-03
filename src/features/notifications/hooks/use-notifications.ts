"use client";

import { useCallback, useEffect, useState } from "react";
import { getNotifications } from "../api/get-notifications";
import type { Notification } from "../types/notification.types";
import { getErrorMessage } from "@/lib/api/errors";

type UseNotificationsResult = {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useNotifications(): UseNotificationsResult {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const interval = setInterval(() => void load(), 15_000);
    return () => clearInterval(interval);
  }, [load]);

  return { notifications, isLoading, error, refetch: load };
}
