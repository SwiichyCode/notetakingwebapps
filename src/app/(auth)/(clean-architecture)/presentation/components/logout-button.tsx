'use client';

import { Button } from '@/components/ui/button';
import { SessionPayload } from '@/types/session.type';

import { logout } from '../middleware/auth.middleware';

interface LogoutButtonProps {
  session: SessionPayload | null;
}

export default function LogoutButton({ session }: LogoutButtonProps) {
  return session ? <Button onClick={async () => await logout()}>Logout</Button> : null;
}
