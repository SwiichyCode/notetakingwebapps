import Image from 'next/image';
import Link from 'next/link';

import { ArchiveIcon } from '@/components/icons/archive-icon';
import { HomeIcon } from '@/components/icons/home-icon';
import { TagIcon } from '@/components/icons/tag-icon';
import { routes } from '@/routes';

import { DashboardAsideNavLink } from './dashboard-aside-nav-link';

const DashboardAsideLogo = () => {
  return (
    <Link href={routes.dashboard} className="block py-4">
      <Image src="/logo.svg" alt="logo" width={95} height={28} />
    </Link>
  );
};

const DashboardAsideLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
  return <DashboardAsideNavLink href={href} icon={icon} label={label} exact={false} />;
};

const DashboardAsideNavigation = () => {
  return (
    <nav className="space-y-1">
      <DashboardAsideLink href={routes.dashboard} icon={<HomeIcon width={20} height={20} />} label="All Notes" />
      <DashboardAsideLink href={routes.archived} icon={<ArchiveIcon width={20} height={20} />} label="Archived Notes" />
    </nav>
  );
};

const DashboardAsideTagsNavigation = () => {
  return (
    <nav className="space-y-1">
      <span className="px-2 text-sm font-medium text-[#8A909E]">Tags</span>
      <DashboardAsideLink
        href={`${routes.dashboard}/cooking`}
        icon={<TagIcon width={20} height={20} />}
        label="Cooking"
      />
    </nav>
  );
};

const DashboardAsideDivider = () => {
  return <div className="my-4 h-[1px] bg-[#E0E4EA]" />;
};

export const DashboardAside = () => {
  return (
    <aside className="w-[240px] border-r border-[#E0E4EA] px-4 py-3">
      <DashboardAsideLogo />
      <DashboardAsideNavigation />
      <DashboardAsideDivider />
      <DashboardAsideTagsNavigation />
    </aside>
  );
};
