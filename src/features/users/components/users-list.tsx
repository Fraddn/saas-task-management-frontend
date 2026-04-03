"use client";

import { useState } from "react";
import type { User, UserRole } from "../types/user.types";
import { updateUser } from "../api/update-user";
import { getErrorMessage } from "@/lib/api/errors";

type UsersListProps = {
  users: User[];
  onUpdated: () => Promise<void>;
};

export function UsersList({ users, onUpdated }: UsersListProps) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [confirmDisableId, setConfirmDisableId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState<UserRole>("Employee");

  function startEdit(user: User) {
    setEditingId(user.id);
    setEditEmail(user.email);
    setEditRole(user.role);
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

  async function handleSaveEdit(user: User) {
    await runAction(user.id, async () => {
      await updateUser(user.id, {
        email: editEmail !== user.email ? editEmail : undefined,
        role: editRole !== user.role ? editRole : undefined,
      });
      setEditingId(null);
    });
  }

  async function handleRoleChange(user: User, role: UserRole) {
    await runAction(user.id, () => updateUser(user.id, { role }));
  }

  async function handleConfirmToggleDisabled(user: User) {
    await runAction(user.id, async () => {
      await updateUser(user.id, { isDisabled: !user.isDisabled });
      setConfirmDisableId(null);
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
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Role
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Created
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => {
              const isBusy = busyId === user.id;
              const isEditing = editingId === user.id;
              const isConfirmingDisable = confirmDisableId === user.id;

              return (
                <tr key={user.id} className="transition hover:bg-gray-50">
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </td>

                  {/* Email */}
                  <td className="px-5 py-3.5">
                    {isEditing ? (
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
                      />
                    ) : (
                      <span className="text-gray-600">{user.email}</span>
                    )}
                  </td>

                  {/* Role — editable dropdown */}
                  <td className="px-5 py-3.5">
                    {isEditing ? (
                      <select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value as UserRole)}
                        className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 shadow-sm outline-none focus:border-gray-400"
                      >
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                      </select>
                    ) : (
                      <select
                        value={user.role}
                        disabled={isBusy}
                        onChange={(e) =>
                          handleRoleChange(user, e.target.value as UserRole)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 shadow-sm outline-none transition focus:border-gray-400 disabled:opacity-50"
                      >
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                      </select>
                    )}
                  </td>

{/* Status */}
                  <td className="px-5 py-3.5">
                    {user.isDisabled ? (
                      <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
                        Disabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 text-gray-500">
                    {new Date(user.createdAtUtc).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(user)}
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
                      ) : isConfirmingDisable ? (
                        <>
                          <button
                            onClick={() => handleConfirmToggleDisabled(user)}
                            disabled={isBusy}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-red-700 disabled:opacity-50"
                          >
                            {isBusy ? (user.isDisabled ? "Enabling..." : "Disabling...") : "Confirm"}
                          </button>
                          <button
                            onClick={() => setConfirmDisableId(null)}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(user)}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setConfirmDisableId(user.id)}
                            className={`rounded-lg border px-3 py-1.5 text-xs font-medium shadow-sm transition ${
                              user.isDisabled
                                ? "border-green-200 bg-green-50 text-green-600 hover:bg-green-100"
                                : "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                            }`}
                          >
                            {user.isDisabled ? "Enable" : "Disable"}
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
