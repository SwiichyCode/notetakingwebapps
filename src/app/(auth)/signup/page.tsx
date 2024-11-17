import { AuthCard } from '../(clean-architecture)/presentation/components/auth-card';
import { SignupForm } from '../(clean-architecture)/presentation/components/signup-form';

export default function SignupPage() {
  return (
    <AuthCard status="signup">
      <SignupForm />
    </AuthCard>
  );
}
