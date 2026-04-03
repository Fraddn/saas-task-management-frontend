import Link from "next/link";
import type { Ticket } from "../types/ticket.types";
import { StatusBadge } from "@/components/ui/StatusBadge";

type RecentTicketsPreviewProps = {
  tickets: Ticket[];
};

export function RecentTicketsPreview({
  tickets,
}: RecentTicketsPreviewProps) {
  const recentTickets = tickets.slice(0, 5);

  return (
    <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900">Recent tickets</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Latest tenant-scoped ticket activity.
          </p>
        </div>

        <Link
          href="/dashboard/tickets"
          className="rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          View all
        </Link>
      </div>

      {recentTickets.length === 0 ? (
        <p className="text-sm text-gray-500">No tickets found.</p>
      ) : (
        <div className="space-y-3">
          {recentTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-lg border border-gray-100 bg-gray-50/50 p-4 transition hover:bg-gray-50"
            >
              <div className="font-medium text-gray-900">{ticket.title}</div>

              {ticket.description ? (
                <p className="mt-1 text-sm text-gray-600 line-clamp-1">
                  {ticket.description}
                </p>
              ) : null}

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <StatusBadge value={ticket.status} />
                <StatusBadge value={ticket.priority} />
                <span className="text-xs text-gray-400">
                  Updated {new Date(ticket.updatedAtUtc).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}