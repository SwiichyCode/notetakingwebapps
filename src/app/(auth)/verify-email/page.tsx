import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { verifyEmailAction } from '../(clean-architecture)/presentation/actions/verify-email.action';
import { AuthCard } from '../(clean-architecture)/presentation/components/auth-card';

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return <div>No verification token provided</div>;
  }

  const result = await verifyEmailAction(token);

  if (!result.success) {
    return <div>{result.error}</div>;
  }

  return (
    <AuthCard status="verify-email">
      <Button variant="link">
        <Link href="/login">Login</Link>
      </Button>
    </AuthCard>
  );
}
