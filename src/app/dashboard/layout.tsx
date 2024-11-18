import { PropsWithChildren } from 'react';

import { DashboardAside } from './(clean-architecture)/presentation/components/dashboard-aside';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-white">
      <DashboardAside />
      {children}
    </div>
  );
}
