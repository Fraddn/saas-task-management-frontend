import { apiRequest } from "@/lib/api/client";

export async function deleteTicket(ticketId: string, rowVersion: number): Promise<void> {
  return apiRequest<void>(`/api/tickets/${ticketId}?rowVersion=${rowVersion}`, {
    method: "DELETE",
  });
}
