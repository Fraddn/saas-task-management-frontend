import { apiRequest } from "@/lib/api/client";
import type { Ticket, TicketStatus, TicketPriority } from "../types/ticket.types";

export type UpdateTicketRequest = {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  rowVersion: number;
};

export async function updateTicket(
  ticketId: string,
  body: UpdateTicketRequest
): Promise<Ticket> {
  return apiRequest<Ticket>(`/api/tickets/${ticketId}`, {
    method: "PATCH",
    body,
  });
}
