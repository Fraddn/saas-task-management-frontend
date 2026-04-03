import { apiRequest } from "@/lib/api/client";
import type { TicketPriority } from "../types/ticket.types";

export type CreateTicketRequest = {
  title: string;
  description?: string;
  priority: TicketPriority;
};

export type CreateTicketResponse = {
  ticketId: string;
};

export async function createTicket(
  body: CreateTicketRequest
): Promise<CreateTicketResponse> {
  return apiRequest<CreateTicketResponse>("/api/tickets", {
    method: "POST",
    body,
    headers: {
      "Idempotency-Key": crypto.randomUUID(),
    },
  });
}