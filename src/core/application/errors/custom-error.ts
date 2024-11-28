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

export class RefactoredCustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly code: string,
    public readonly errors?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  public serializeErrors() {
    return {
      message: this.message,
      code: this.code,
      status: this.statusCode,
      errors: this.errors,
    };
  }
}

export class NotFoundError extends RefactoredCustomError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class BadRequestError extends RefactoredCustomError {
  constructor(message: string, errors?: Record<string, unknown>) {
    super(message, 400, 'BAD_REQUEST', errors);
  }
}

export class UnauthorizedError extends RefactoredCustomError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends RefactoredCustomError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ConflictError extends RefactoredCustomError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}
