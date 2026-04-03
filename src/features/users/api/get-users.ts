import { apiRequest } from "@/lib/api/client";
import type { UserPagedResult } from "../types/user.types";

export async function getUsers(
  page: number = 1,
  pageSize: number = 20
): Promise<UserPagedResult> {
  return apiRequest<UserPagedResult>(
    `/api/users?page=${page}&pageSize=${pageSize}`
  );
}
