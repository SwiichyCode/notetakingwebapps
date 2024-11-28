import Link from 'next/link';

import { routes } from '@/config/routes';
import { verifyEmailAction } from '@/core/presentation/actions/verify-email.action';
import { AuthCard } from '@/core/presentation/components/authentication/auth-card';
import { Button } from '@/core/presentation/components/common/ui/button';

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return <div>No verification token provided</div>;
  }

  await verifyEmailAction(token);

  return (
    <AuthCard status="verify-email">
      <Button variant="link">
        <Link href={routes.login}>Login</Link>
      </Button>
    </AuthCard>
  );
}
