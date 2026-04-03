"use client";

import { useState } from "react";
import { TicketsList } from "@/features/tickets/components/tickets-list";
import { CreateTicketForm } from "@/features/tickets/components/create-ticket-form";
import { useTickets } from "@/features/tickets/hooks/use-tickets";
import { useEmployees } from "@/features/users/hooks/use-employees";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";

export default function TicketsPage() {
  const { tickets, isLoading, error, refetch } = useTickets();
  const { employees } = useEmployees();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tickets"
        description="View and manage support tickets."
        action={
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
          >
            {showCreate ? "Cancel" : "New Ticket"}
          </button>
        }
      />

      {showCreate && (
        <CreateTicketForm
          onCreated={() => {
            setShowCreate(false);
            void refetch();
          }}
        />
      )}

      {isLoading ? (
        <LoadingState message="Loading tickets..." />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : tickets.length === 0 ? (
        <EmptyState
          title="No tickets yet"
          description="Create your first ticket to get started."
        />
      ) : (
        <TicketsList tickets={tickets} employees={employees} onUpdated={refetch} />
      )}
    </div>
  );
}