import LogoutButton from '../(auth)/(clean-architecture)/presentation/components/logout-button';
import { getSession } from '../(auth)/(clean-architecture)/presentation/middleware/auth.middleware';

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div>
      Dashboard <LogoutButton session={session} />
    </div>
  );
}
