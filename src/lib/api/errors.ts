export type ProblemDetails = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
};

export class ApiError extends Error {
  public readonly status: number;
  public readonly problemDetails: ProblemDetails | null;

  constructor(
    status: number,
    problemDetails: ProblemDetails | null,
    fallbackMessage?: string
  ) {
    const message =
      problemDetails?.detail ??
      problemDetails?.title ??
      fallbackMessage ??
      "An unexpected error occurred";
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.problemDetails = problemDetails;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}
