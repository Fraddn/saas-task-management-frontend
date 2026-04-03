import { apiRequest } from "@/lib/api/client";
import type { Ticket } from "../types/ticket.types";

export async function getTicket(ticketId: string): Promise<Ticket> {
  return apiRequest<Ticket>(`/api/tickets/${ticketId}`);
}
