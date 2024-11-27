import { CustomError } from './custom-error';

export class InvalidCredentialsError extends CustomError {
  constructor() {
    super('Invalid credentials', 401);
    this.name = 'InvalidCredentialsError';
  }
}

export class EmailNotVerifiedError extends CustomError {
  constructor(email: string) {
    super('Please verify your email before logging in', 403);
    this.name = 'EmailNotVerifiedError';
    this.metadata = { email, isEmailVerification: true };
  }
}

export class UserAlreadyExistsError extends CustomError {
  constructor(email: string) {
    super('User with this email already exists', 409);
    this.name = 'UserAlreadyExistsError';
    this.metadata = { email };
  }
}

export class UserNotFoundError extends CustomError {
  constructor(email: string) {
    super('User not found', 404);
    this.name = 'UserNotFoundError';
    this.metadata = { email };
  }
}

export class FailedToCreateUserError extends CustomError {
  constructor() {
    super('Failed to create user', 500);
    this.name = 'FailedToCreateUserError';
  }
}

export class UserWithThisEmailAlreadyExistsError extends CustomError {
  constructor(email: string) {
    super('A user with this email already exists, please check your inbox for a verification email.', 409);
    this.name = 'UserWithThisEmailAlreadyExistsError';
    this.metadata = { email };
  }
}

export class InvalidResetTokenError extends CustomError {
  constructor() {
    super('Invalid or expired reset token.', 400);
    this.name = 'InvalidResetTokenError';
  }
}

export class ExpiredResetTokenError extends CustomError {
  constructor() {
    super('Reset token has expired.', 400);
    this.name = 'ExpiredResetTokenError';
  }
}
