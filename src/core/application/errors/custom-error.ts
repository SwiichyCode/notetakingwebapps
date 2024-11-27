export class CustomError extends Error {
  constructor(
    message: string,
    public readonly code?: number,
    public metadata?: Record<string, any>,
  ) {
    super(message);
    this.name = 'CustomError';
    this.metadata = metadata;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}
