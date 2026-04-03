type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm">
      <p className="text-sm font-medium text-red-800">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition hover:bg-red-50"
        >
          Retry
        </button>
      )}
    </div>
  );
}
