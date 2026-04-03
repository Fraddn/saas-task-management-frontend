const statusStyles: Record<string, string> = {
  Open: "bg-blue-50 text-blue-700 border border-blue-200",
  InProgress: "bg-amber-50 text-amber-700 border border-amber-200",
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Low: "bg-slate-50 text-slate-600 border border-slate-200",
  Medium: "bg-orange-50 text-orange-700 border border-orange-200",
  High: "bg-red-50 text-red-700 border border-red-200",
  Admin: "bg-violet-50 text-violet-700 border border-violet-200",
  Employee: "bg-sky-50 text-sky-700 border border-sky-200",
};

type StatusBadgeProps = {
  value: string;
};

export function StatusBadge({ value }: StatusBadgeProps) {
  const style = statusStyles[value] ?? "bg-gray-100 text-gray-700";
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${style}`}
    >
      {value}
    </span>
  );
}
