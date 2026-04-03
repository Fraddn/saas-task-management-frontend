"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCompany } from "@/features/company/hooks/use-company";
import { CompanyDetails } from "@/features/company/components/company-details";
import { UpdateCompanyForm } from "@/features/company/components/update-company-form";
import { deleteCompany } from "@/features/company/api/delete-company";
import { logoutSession } from "@/features/auth/logout-session";
import { useAuth } from "@/features/auth/useAuth";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { getErrorMessage } from "@/lib/api/errors";

export default function CompanyPage() {
  const router = useRouter();
  const { setUnauthenticated } = useAuth();
  const { company, isLoading, error, refetch } = useCompany();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleDeleteCompany() {
    setDeleteError(null);
    setIsDeleting(true);
    try {
      await deleteCompany();
      await logoutSession();
      setUnauthenticated();
      router.replace("/");
    } catch (err) {
      setDeleteError(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Company"
        description="View and manage company details."
        action={
          company && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
          )
        }
      />

      {isLoading ? (
        <LoadingState message="Loading company info..." />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : company ? (
        isEditing ? (
          <UpdateCompanyForm
            company={company}
            onUpdated={() => {
              setIsEditing(false);
              void refetch();
            }}
          />
        ) : (
          <CompanyDetails company={company} />
        )
      ) : null}

      {/* Delete Company — danger zone */}
      {company && !isEditing && (
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
          <h3 className="text-sm font-semibold text-red-900">Danger Zone</h3>
          <p className="mt-1 text-sm text-red-700">
            Deleting the company is permanent and will remove all data including
            users, tickets, and notifications.
          </p>

          {deleteError && (
            <p className="mt-3 text-sm font-medium text-red-600">
              {deleteError}
            </p>
          )}

          <div className="mt-4 flex items-center gap-2">
            {confirmDelete ? (
              <>
                <button
                  onClick={handleDeleteCompany}
                  disabled={isDeleting}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Yes, delete company"}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50"
              >
                Delete Company
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
