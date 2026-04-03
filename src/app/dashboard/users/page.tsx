"use client";

import { useState } from "react";
import { UsersList } from "@/features/users/components/users-list";
import { CreateUserForm } from "@/features/users/components/create-user-form";
import { useUsers } from "@/features/users/hooks/use-users";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";

export default function UsersPage() {
  const {
    users,
    totalCount,
    totalPages,
    page,
    isLoading,
    error,
    setPage,
    refetch,
  } = useUsers();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage organisation members."
        action={
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
          >
            {showCreate ? "Cancel" : "Add User"}
          </button>
        }
      />

      {showCreate && (
        <CreateUserForm
          onCreated={() => {
            setShowCreate(false);
            void refetch();
          }}
        />
      )}

      {isLoading ? (
        <LoadingState message="Loading users..." />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : users.length === 0 ? (
        <EmptyState title="No users found" />
      ) : (
        <>
          <UsersList users={users} onUpdated={refetch} />

          {totalPages > 1 && (
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{totalCount} users total</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                  className="rounded-lg border border-gray-200 px-3.5 py-2 font-medium shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="flex items-center px-3">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages}
                  className="rounded-lg border border-gray-200 px-3.5 py-2 font-medium shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
