"use client";

import { useCallback, useEffect, useState } from "react";
import { getUnreadCount } from "../api/get-unread-count";

type UseUnreadCountResult = {
  count: number;
  isLoading: boolean;
  refetch: () => Promise<void>;
};

export function useUnreadCount(): UseUnreadCountResult {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getUnreadCount();
      setCount(data.count);
    } catch {
      // Silently fail for the badge — non-critical UI
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const interval = setInterval(() => void load(), 30_000);
    return () => clearInterval(interval);
  }, [load]);

  return { count, isLoading, refetch: load };
}
