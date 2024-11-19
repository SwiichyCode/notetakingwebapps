import { PropsWithChildren } from 'react';

import { DashboardAside } from './(clean-architecture)/presentation/components/dashboard-aside';
import { DashboardHeader } from './(clean-architecture)/presentation/components/dashboard-header';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-white">
      <DashboardAside />

      <div className="flex w-full flex-col">
        <DashboardHeader />

        {children}
      </div>
    </div>
  );
}
