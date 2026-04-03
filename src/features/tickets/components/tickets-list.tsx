"use client";

import { useState } from "react";
import type { Ticket, TicketPriority, TicketStatus } from "../types/ticket.types";
import type { User } from "@/features/users/types/user.types";
import { assignTicket } from "../api/assign-ticket";
import { completeTicket } from "../api/complete-ticket";
import { updateTicket } from "../api/update-ticket";
import { deleteTicket } from "../api/delete-ticket";
import { getErrorMessage } from "@/lib/api/errors";

type TicketsListProps = {
  tickets: Ticket[];
  employees: User[];
  onUpdated: () => Promise<void>;
};

export function TicketsList({ tickets, employees, onUpdated }: TicketsListProps) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  function startEdit(ticket: Ticket) {
    setEditingId(ticket.id);
    setEditTitle(ticket.title);
    setEditDescription(ticket.description ?? "");
    setActionError(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function runAction(id: string, fn: () => Promise<void>) {
    setActionError(null);
    setBusyId(id);
    try {
      await fn();
      await onUpdated();
    } catch (err) {
      setActionError(getErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  }

  async function handleSaveEdit(ticket: Ticket) {
    await runAction(ticket.id, async () => {
      await updateTicket(ticket.id, {
        title: editTitle,
        description: editDescription || undefined,
        status: ticket.status,
        priority: ticket.priority,
        rowVersion: ticket.rowVersion,
      });
      setEditingId(null);
    });
  }

  async function handlePriorityChange(ticket: Ticket, priority: TicketPriority) {
    await runAction(ticket.id, () =>
      updateTicket(ticket.id, {
        title: ticket.title,
        description: ticket.description ?? undefined,
        status: ticket.status,
        priority,
        rowVersion: ticket.rowVersion,
      }).then(() => {})
    );
  }

  async function handleAssign(ticket: Ticket, assigneeUserId: string) {
    await runAction(ticket.id, () =>
      assignTicket(ticket.id, { assigneeUserId, rowVersion: ticket.rowVersion })
    );
  }

  async function handleComplete(ticket: Ticket) {
    await runAction(ticket.id, () =>
      completeTicket(ticket.id, { rowVersion: ticket.rowVersion })
    );
  }

  async function handleDelete(ticket: Ticket) {
    await runAction(ticket.id, async () => {
      await deleteTicket(ticket.id, ticket.rowVersion);
      setConfirmDeleteId(null);
    });
  }

  return (
    <div className="space-y-3">
      {actionError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {actionError}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Ticket
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Priority
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Assigned To
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Updated
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {tickets.map((ticket) => {
              const isBusy = busyId === ticket.id;
              const isEditing = editingId === ticket.id;
              const isConfirmingDelete = confirmDeleteId === ticket.id;

              return (
                <tr key={ticket.id} className="transition hover:bg-gray-50/50">
                  {/* Title / Description */}
                  <td className="px-5 py-4">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        />
                        <input
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Description (optional)"
                          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 shadow-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="font-medium text-gray-900">{ticket.title}</p>
                        {ticket.description && (
                          <p className="mt-0.5 text-xs text-gray-400 line-clamp-1">
                            {ticket.description}
                          </p>
                        )}
                      </>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <select
                      value={ticket.status}
                      disabled={isBusy}
                      onChange={(e) =>
                        runAction(ticket.id, () =>
                          updateTicket(ticket.id, {
                            title: ticket.title,
                            description: ticket.description ?? undefined,
                            status: e.target.value as TicketStatus,
                            priority: ticket.priority,
                            rowVersion: ticket.rowVersion,
                          }).then(() => {})
                        )
                      }
                      className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 shadow-sm outline-none transition focus:border-gray-400 disabled:opacity-50"
                    >
                      <option value="Open">Open</option>
                      <option value="InProgress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>

                  {/* Priority — editable dropdown */}
                  <td className="px-5 py-4">
                    <select
                      value={ticket.priority}
                      disabled={isBusy}
                      onChange={(e) =>
                        handlePriorityChange(ticket, e.target.value as TicketPriority)
                      }
                      className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 shadow-sm outline-none transition focus:border-gray-400 disabled:opacity-50"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </td>

                  {/* Assigned To */}
                  <td className="px-5 py-4">
                    <select
                      value={ticket.assignedToUserId ?? ""}
                      disabled={isBusy}
                      onChange={(e) => {
                        if (e.target.value) {
                          void handleAssign(ticket, e.target.value);
                        }
                      }}
                      className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-600 shadow-sm outline-none transition focus:border-gray-400 disabled:opacity-50"
                    >
                      <option value="" disabled>
                        Assign...
                      </option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.firstName} {emp.lastName}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Updated */}
                  <td className="px-5 py-4 text-xs text-gray-400">
                    {new Date(ticket.updatedAtUtc).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(ticket)}
                            disabled={isBusy}
                            className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-50"
                          >
                            {isBusy ? "Saving..." : "Save"}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </>
                      ) : isConfirmingDelete ? (
                        <>
                          <button
                            onClick={() => handleDelete(ticket)}
                            disabled={isBusy}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-red-700 disabled:opacity-50"
                          >
                            {isBusy ? "Deleting..." : "Confirm"}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(ticket)}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
                          >
                            Edit
                          </button>
                          {ticket.status !== "Completed" && (
                            <button
                              onClick={() => handleComplete(ticket)}
                              disabled={isBusy}
                              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-100 disabled:opacity-50"
                            >
                              {isBusy ? "..." : "Complete"}
                            </button>
                          )}
                          <button
                            onClick={() => setConfirmDeleteId(ticket.id)}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 shadow-sm transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}