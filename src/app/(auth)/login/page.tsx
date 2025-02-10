import { AuthCard } from '@/core/presentation/components/authentication/auth-card';
import { LoginForm } from '@/core/presentation/components/authentication/login-form';
import { getCurrentSession } from '@/core/presentation/middleware/auth.middleware';

export default async function LoginPage() {
  const session = await getCurrentSession();

  console.log('[LoginPage] Session:', session);

  return (
    <AuthCard status="login">
      <LoginForm />
    </AuthCard>
  );
}
