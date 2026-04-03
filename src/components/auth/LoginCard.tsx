"use client";

import { useState } from "react";

type AuthMode = "login" | "register";

export default function LoginCard() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
      <div className="mb-6">
        <div className="mb-6 grid grid-cols-2 rounded-lg bg-gray-100 p-1">
          <div className="mb-6 flex gap-2">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                mode === "login"
                  ? "bg-slate-900 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                mode === "register"
                  ? "bg-slate-900 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Register
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMode("register")}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              mode === "register"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-gray-600"
            }`}
          >
            Register company
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">
          {mode === "login" ? "Sign in" : "Register company"}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {mode === "login"
            ? "Access your organisation workspace."
            : "Create a new organisation and admin account."}
        </p>
      </div>

      {mode === "login" ? (
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor rounded-lg bg-slate-900 py-3 font-medium text-white transition hover:opacity-95"
          >
            Sign in
          </button>
        </form>
      ) : (
        <form className="space-y-4">
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 py-3 font-medium text-white transition hover:opacity-95"
          >
            Register company
          </button>
        </form>
      )}
    </div>
  );
}