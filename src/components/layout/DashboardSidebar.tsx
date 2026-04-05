"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/useAuth";
import { useSharedUnreadCount } from "@/features/notifications/unread-count-context";

const navItems = [
  { href: "/dashboard", label: "Overview", adminOnly: false },
  { href: "/dashboard/tickets", label: "Tickets", adminOnly: false },
  { href: "/dashboard/users", label: "Users", adminOnly: true },
  { href: "/dashboard/company", label: "Company", adminOnly: true },
  { href: "/dashboard/notifications", label: "Notifications", adminOnly: false },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const { count: unreadCount } = useSharedUnreadCount();

  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  return (
    <nav aria-label="Dashboard navigation" className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-base font-bold tracking-tight text-gray-900">
          TaskFlow
        </h2>
        <p className="mt-0.5 text-xs text-gray-400">Workspace</p>
      </div>

      <ul className="space-y-1.5">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href;
          const isNotif = item.href === "/dashboard/notifications";
          const hasUnread = isNotif && unreadCount > 0;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : hasUnread
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span>{item.label}</span>
                {hasUnread && (
                  <span
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                      isActive
                        ? "bg-white text-gray-900"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}