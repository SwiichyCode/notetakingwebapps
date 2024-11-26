import { AuthCard } from '@/core/presentation/components/authentication/auth-card';
import { SignupForm } from '@/core/presentation/components/authentication/signup-form';

export default function SignupPage() {
  return (
    <AuthCard status="signup">
      <SignupForm />
    </AuthCard>
  );
}
