import AuthGuard from '@/components/auth/AuthGuard';
import DashboardShell from '@/components/layout/DashboardShell';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { NotificationsProvider } from '@/features/notifications/unread-count-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <NotificationsProvider>
        <DashboardShell
          sidebar={<DashboardSidebar />}
          header={<DashboardHeader />}
        >
          {children}
        </DashboardShell>
      </NotificationsProvider>
    </AuthGuard>
  );
}