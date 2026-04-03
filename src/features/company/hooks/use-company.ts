"use client";

import { useCallback, useEffect, useState } from "react";
import { getCompany } from "../api/get-company";
import type { Company } from "../types/company.types";
import { getErrorMessage } from "@/lib/api/errors";

type UseCompanyResult = {
  company: Company | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useCompany(): UseCompanyResult {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getCompany();
      setCompany(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { company, isLoading, error, refetch: load };
}
