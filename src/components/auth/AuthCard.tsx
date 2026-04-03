"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterCompanyForm from "./RegisterCompanyForm";

export type AuthMode = "login" | "register";

export default function AuthCard() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {mode === "login" ? "Sign in" : "Create company"}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {mode === "login"
            ? "Access your organisation workspace."
            : "Set up your organisation and admin account."}
        </p>
      </div>

      {mode === "login" ? (
        <>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have a company?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode("register");
              }}
              className="font-semibold text-gray-900 underline underline-offset-4 transition hover:text-gray-700"
            >
              Register
            </a>
          </p>
        </>
      ) : (
        <>
          <RegisterCompanyForm />
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode("login");
              }}
              className="font-semibold text-gray-900 underline underline-offset-4 transition hover:text-gray-700"
            >
              Sign in
            </a>
          </p>
        </>
      )}
    </div>
  );
}