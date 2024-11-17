import { AuthCard } from '../(clean-architecture)/presentation/components/auth-card';
import { ForgotPasswordForm } from '../(clean-architecture)/presentation/components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <AuthCard status="forgot-password">
      <ForgotPasswordForm />
    </AuthCard>
  );
}
