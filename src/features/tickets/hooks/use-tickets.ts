"use client";

import { useCallback, useEffect, useState } from "react";
import { getTickets } from "../api/get-tickets";
import type { Ticket } from "../types/ticket.types";

type UseTicketsResult = {
  tickets: Ticket[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useTickets(): UseTicketsResult {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getTickets();
      setTickets(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load tickets."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTickets();
  }, [loadTickets]);

  return {
    tickets,
    isLoading,
    error,
    refetch: loadTickets,
  };
}