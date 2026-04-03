"use client";

import { useTickets } from "@/features/tickets/hooks/use-tickets";
import { useUnreadCount } from "@/features/notifications/hooks/use-unread-count";
import { useCompany } from "@/features/company/hooks/use-company";
import { RecentTicketsPreview } from "@/features/tickets/components/recent-tickets-preview";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className={`mt-2 text-3xl font-bold ${accent ?? "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const {
    tickets,
    isLoading: ticketsLoading,
    error: ticketsError,
    refetch: refetchTickets,
  } = useTickets();
  const { count: unreadCount, isLoading: unreadLoading } = useUnreadCount();
  const { company, isLoading: companyLoading } = useCompany();

  const openTickets = tickets.filter((t) => t.status === "Open").length;
  const inProgressTickets = tickets.filter(
    (t) => t.status === "InProgress"
  ).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your workspace."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Total Tickets"
          value={ticketsLoading ? "—" : String(tickets.length)}
        />
        <SummaryCard
          label="Open"
          value={ticketsLoading ? "—" : String(openTickets)}
          accent="text-amber-600"
        />
        <SummaryCard
          label="In Progress"
          value={ticketsLoading ? "—" : String(inProgressTickets)}
          accent="text-blue-600"
        />
        <SummaryCard
          label="Unread Notifications"
          value={unreadLoading ? "—" : String(unreadCount)}
          accent={unreadCount > 0 ? "text-red-600" : undefined}
        />
      </div>

      {!companyLoading && company && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Company
          </p>
          <p className="mt-2 text-lg font-bold text-gray-900">
            {company.name}
          </p>
          <p className="text-sm text-gray-500">{company.slug}</p>
        </div>
      )}

      {ticketsError ? (
        <ErrorState
          message="Failed to load tickets."
          onRetry={refetchTickets}
        />
      ) : ticketsLoading ? (
        <LoadingState message="Loading tickets..." />
      ) : (
        <RecentTicketsPreview tickets={tickets} />
      )}
    </div>
  );
}