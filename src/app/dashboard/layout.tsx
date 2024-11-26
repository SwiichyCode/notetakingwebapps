import type { PropsWithChildren } from 'react';

import { DashboardAside } from '@/core/presentation/components/dashboard/dashboard-aside';
import { DashboardHeader } from '@/core/presentation/components/dashboard/dashboard-header';

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
