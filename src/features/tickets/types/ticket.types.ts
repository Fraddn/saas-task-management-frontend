export type TicketStatus = "Open" | "InProgress" | "Completed";
export type TicketPriority = "Low" | "Medium" | "High";

export type Ticket = {
  id: string;
  title: string;
  description: string | null;
  status: TicketStatus;
  priority: TicketPriority;
  createdByUserId: string;
  assignedToUserId: string | null;
  createdAtUtc: string;
  updatedAtUtc: string;
  rowVersion: number;
};