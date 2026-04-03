import { apiRequest } from "@/lib/api/client";
import type { CreateUserRequest } from "../types/user.types";

export type CreateUserResponse = {
  userId: string;
};

export async function createUser(
  body: CreateUserRequest
): Promise<CreateUserResponse> {
  return apiRequest<CreateUserResponse>("/api/users", {
    method: "POST",
    body,
  });
}
