import LogoutButton from '@/core/presentation/components/authentication/logout-button';
import { getCurrentSession } from '@/core/presentation/middleware/auth.middleware';

export default async function SettingsPage() {
  const session = await getCurrentSession();

  return <LogoutButton session={session} />;
}
