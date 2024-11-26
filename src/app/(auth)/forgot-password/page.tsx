import { AuthCard } from '@/core/presentation/components/authentication/auth-card';
import { ForgotPasswordForm } from '@/core/presentation/components/authentication/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <AuthCard status="forgot-password">
      <ForgotPasswordForm />
    </AuthCard>
  );
}
