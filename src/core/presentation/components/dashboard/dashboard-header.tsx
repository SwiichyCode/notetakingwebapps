'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routes } from '@/config/routes';
import { SettingsIcon } from '@/core/presentation/components/common/icons/settings-icon';

export const DashboardHeader = () => {
  const pathname = usePathname();

  const handleCurrentPageTitle = () => {
    if (pathname.includes(routes.dashboard)) {
      return 'All Notes';
    }

    if (pathname.includes(routes.archived)) {
      return 'Archived Notes';
    }
  };

  return (
    <header className="flex h-[81px] items-center justify-between border-b border-gray-200 p-4">
      <h1 className="text-2xl font-bold">{handleCurrentPageTitle()}</h1>

      <div className="flex items-center gap-2">
        <Link href={routes.settings} className="text-gray-500 transition-colors hover:text-gray-900">
          <SettingsIcon />
        </Link>
      </div>
    </header>
  );
};
