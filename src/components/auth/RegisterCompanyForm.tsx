"use client";

import { useState } from "react";
import { registerCompany } from "@/features/auth/api";
import { getErrorMessage } from "@/lib/api/errors";

export default function RegisterCompanyForm() {
  const [companyName, setCompanyName] = useState("");
  const [companySlug, setCompanySlug] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await registerCompany({
        companyName,
        companySlug,
        adminEmail,
        adminPassword,
        adminFirstName,
        adminLastName,
      });
      setSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="space-y-3 text-center">
        <p className="text-sm font-medium text-green-700">
          Company registered successfully!
        </p>
        <p className="text-sm text-gray-600">
          You can now sign in with your admin credentials.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="companyName"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Company name
        </label>
        <input
          id="companyName"
          type="text"
          placeholder="Acme Ltd"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="companySlug"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Company slug
        </label>
        <input
          id="companySlug"
          type="text"
          placeholder="acme-ltd"
          value={companySlug}
          onChange={(e) => setCompanySlug(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="adminEmail"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Admin email
        </label>
        <input
          id="adminEmail"
          type="email"
          placeholder="admin@company.com"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="adminPassword"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Admin password
        </label>
        <input
          id="adminPassword"
          type="password"
          placeholder="Create a password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="adminFirstName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            First name
          </label>
          <input
            id="adminFirstName"
            type="text"
            placeholder="Admin"
            value={adminFirstName}
            onChange={(e) => setAdminFirstName(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="adminLastName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Last name
          </label>
          <input
            id="adminLastName"
            type="text"
            placeholder="User"
            value={adminLastName}
            onChange={(e) => setAdminLastName(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gray-900 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-60"
      >
        {isSubmitting ? "Registering..." : "Register Company"}
      </button>
    </form>
  );
}