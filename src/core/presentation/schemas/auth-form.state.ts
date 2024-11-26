export type AuthFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      isEmailVerification?: boolean;
      email?: string;
    }
  | undefined;

export type ForgotPasswordFormState =
  | {
      errors?: {
        email?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

export type ResetPasswordFormState =
  | {
      errors?: {
        password?: string[];
        confirmPassword?: string[];
        token?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
