import { AuthCard } from '../(clean-architecture)/presentation/components/auth-card';
import { LoginForm } from '../(clean-architecture)/presentation/components/login-form';

export default function LoginPage() {
  return (
    <AuthCard status="login">
      <LoginForm />
    </AuthCard>
  );
}
