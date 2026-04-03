import { apiRequest } from "@/lib/api/client";

export type CompleteTicketRequest = {
  rowVersion: number;
  resolutionNote?: string;
};

export async function completeTicket(
  ticketId: string,
  body: CompleteTicketRequest
): Promise<void> {
  return apiRequest<void>(`/api/tickets/${ticketId}/complete`, {
    method: "POST",
    body,
  });
}
