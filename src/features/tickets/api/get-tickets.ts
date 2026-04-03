import { apiRequest } from "@/lib/api/client";
import type { Ticket } from "../types/ticket.types";

export async function getTickets(): Promise<Ticket[]> {
  return apiRequest<Ticket[]>("/api/tickets");
}