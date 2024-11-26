export interface InitiateResetDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResult {
  success: boolean;
  error?: string;
}
