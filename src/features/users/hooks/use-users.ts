"use client";

import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../api/get-users";
import type { User, UserPagedResult } from "../types/user.types";
import { getErrorMessage } from "@/lib/api/errors";

type UseUsersResult = {
  users: User[];
  totalCount: number;
  totalPages: number;
  page: number;
  isLoading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
};

export function useUsers(pageSize: number = 20): UseUsersResult {
  const [data, setData] = useState<UserPagedResult | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getUsers(page, pageSize);
      setData(result);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    users: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    page,
    isLoading,
    error,
    setPage,
    refetch: load,
  };
}
