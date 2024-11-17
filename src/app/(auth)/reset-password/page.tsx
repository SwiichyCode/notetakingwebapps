import { redirect } from 'next/navigation';

import { AuthCard } from '../(clean-architecture)/presentation/components/auth-card';
import { ResetPasswordForm } from '../(clean-architecture)/presentation/components/reset-password-form';

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    redirect('/forgot-password');
  }

  return (
    <AuthCard status="reset-password">
      <ResetPasswordForm token={token} />
    </AuthCard>
  );
}
