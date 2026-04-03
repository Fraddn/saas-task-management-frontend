import AuthCard from "@/components/auth/AuthCard";
import PublicGuard from '@/components/auth/PublicGuard';

export default function HomePage() {
  return (
    <PublicGuard>
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              TaskFlow
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Task management for teams.
            </p>
          </div>

          <AuthCard />
        </div>
      </main>
    </PublicGuard>
  );
}