"use client";

import { useState } from "react";
import { createTicket } from "../api/create-ticket";
import type { TicketPriority } from "../types/ticket.types";
import { getErrorMessage } from "@/lib/api/errors";

type CreateTicketFormProps = {
  onCreated: () => void;
};

export function CreateTicketForm({ onCreated }: CreateTicketFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("Medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await createTicket({
        title,
        description: description || undefined,
        priority,
      });
      onCreated();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h3 className="text-sm font-semibold text-gray-900">Create new ticket</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={3}
        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as TicketPriority)}
        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-60"
      >
        {isSubmitting ? "Creating..." : "Create Ticket"}
      </button>
    </form>
  );
}
