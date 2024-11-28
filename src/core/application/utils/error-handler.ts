type ErrorConstructor = new (...arguments_: any[]) => Error;

export const isKnownError = (error: unknown, errorTypes: ErrorConstructor[]): boolean => {
  return error instanceof Error && errorTypes.some(errorType => error instanceof errorType);
};
