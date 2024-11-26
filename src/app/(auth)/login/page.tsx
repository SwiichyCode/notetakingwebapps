import { AuthCard } from '@/core/presentation/components/authentication/auth-card';
import { LoginForm } from '@/core/presentation/components/authentication/login-form';

export default function LoginPage() {
  return (
    <AuthCard status="login">
      <LoginForm />
    </AuthCard>
  );
}
