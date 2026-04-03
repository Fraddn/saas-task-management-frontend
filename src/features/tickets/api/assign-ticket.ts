import { apiRequest } from "@/lib/api/client";

export type AssignTicketRequest = {
  assigneeUserId: string;
  rowVersion: number;
};

export async function assignTicket(
  ticketId: string,
  body: AssignTicketRequest
): Promise<void> {
  return apiRequest<void>(`/api/tickets/${ticketId}/assign`, {
    method: "POST",
    body,
  });
}
