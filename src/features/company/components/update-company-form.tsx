"use client";

import { useState } from "react";
import { updateCompany } from "../api/update-company";
import type { Company } from "../types/company.types";
import { getErrorMessage } from "@/lib/api/errors";

type UpdateCompanyFormProps = {
  company: Company;
  onUpdated: () => void;
};

export function UpdateCompanyForm({
  company,
  onUpdated,
}: UpdateCompanyFormProps) {
  const [name, setName] = useState(company.name);
  const [slug, setSlug] = useState(company.slug);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await updateCompany({ name, slug });
      onUpdated();
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
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Slug
        </label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
        />
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
