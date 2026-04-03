"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/features/auth/api";
import { setToken } from "@/lib/auth/token-storage";
import { useAuth } from "@/features/auth/useAuth";

export default function LoginForm() {
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  const [companySlug, setCompanySlug] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await login({ companySlug, email, password });

      setToken(result.accessToken);
      setAuthenticated(result.user);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Login failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        placeholder="Company slug"
        value={companySlug}
        onChange={(e) => setCompanySlug(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
      />

      {errorMessage && (
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gray-900 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}