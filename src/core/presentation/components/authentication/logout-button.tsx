'use client';

import { SessionPayload } from '@/config/types/session.type';
import { Button } from '@/core/presentation/components/common/ui/button';
import { logout } from '@/core/presentation/middleware/auth.middleware';

interface LogoutButtonProps {
  session: SessionPayload | null;
}

export default function LogoutButton({ session }: LogoutButtonProps) {
  return session ? <Button onClick={async () => await logout()}>Logout</Button> : null;
}
