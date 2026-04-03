export default function PublicHero() {
  return (
    <section className="hidden lg:flex min-h-screen bg-gray-900 text-white items-center">
      <div className="w-full max-w-xl px-8 lg:px-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          TaskFlow
        </p>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight">
          Manage work across your organisation with clarity.
        </h1>

        <p className="mt-6 text-base leading-7 text-gray-400">
          A multi-tenant platform for teams to manage tickets, notifications,
          and workflows in one secure place.
        </p>

        <div className="mt-10 grid gap-3">
          <div className="rounded-xl border border-gray-700/60 bg-gray-800/40 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Auth</p>
            <p className="mt-1 text-sm font-semibold">Secure JWT access &amp; refresh</p>
          </div>

          <div className="rounded-xl border border-gray-700/60 bg-gray-800/40 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Notifications</p>
            <p className="mt-1 text-sm font-semibold">Real-time delivery</p>
          </div>

          <div className="rounded-xl border border-gray-700/60 bg-gray-800/40 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Tickets</p>
            <p className="mt-1 text-sm font-semibold">Tenant-aware workflow</p>
          </div>
        </div>
      </div>
    </section>
  );
}