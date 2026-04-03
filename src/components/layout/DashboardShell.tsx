type DashboardShellProps = {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
};

export default function DashboardShell({
  sidebar,
  header,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-gray-200 bg-white md:block">
          <div className="sticky top-0 h-screen overflow-y-auto px-4 py-6">
            {sidebar}
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-sm">
            {header}
          </header>

          <main className="flex-1 px-6 py-8 lg:px-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}