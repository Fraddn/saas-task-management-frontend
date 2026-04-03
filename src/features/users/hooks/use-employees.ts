"use client";

import { useCallback, useEffect, useState } from "react";
import { getEmployees } from "../api/get-employees";
import type { User } from "../types/user.types";

type UseEmployeesResult = {
  employees: User[];
  isLoading: boolean;
};

export function useEmployees(): UseEmployeesResult {
  const [employees, setEmployees] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch {
      // Non-critical — used for dropdown population
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { employees, isLoading };
}
