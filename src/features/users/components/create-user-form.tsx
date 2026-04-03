"use client";

import { useState } from "react";
import { createUser } from "../api/create-user";
import type { UserRole } from "../types/user.types";
import { getErrorMessage } from "@/lib/api/errors";

type CreateUserFormProps = {
  onCreated: () => void;
};

export function CreateUserForm({ onCreated }: CreateUserFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("Employee");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await createUser({ email, firstName, lastName, password, role });
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
      <h3 className="text-sm font-semibold text-gray-900">Add new user</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          required
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          required
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
        />
      </div>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
      >
        <option value="Employee">Employee</option>
        <option value="Admin">Admin</option>
      </select>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-60"
      >
        {isSubmitting ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
