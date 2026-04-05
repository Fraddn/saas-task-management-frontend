'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/useAuth';
import { logoutSession } from '@/features/auth/logout-session';
import { NotificationBell } from '@/features/notifications/components/notification-bell';

export default function DashboardHeader() {
  const router = useRouter();
  const { user, setUnauthenticated } = useAuth();

  const displayName = user
    ? `${user.firstName} ${user.lastName}`
    : 'Unknown user';

  async function handleLogout() {
    await logoutSession();
    setUnauthenticated();
    router.replace('/');
  }

  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-2 sm:gap-3">
        <NotificationBell />

        <div className="h-5 w-px bg-gray-200" />

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            {user?.role && (
              <p className="text-xs text-gray-500">{user.role}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <span className="hidden sm:inline">Logout</span>
          <span className="sm:hidden">Out</span>
        </button>
      </div>
    </div>
  );
}