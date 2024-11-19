'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type NavLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean; // Pour gérer les correspondances exactes ou partielles
};

export const DashboardAsideNavLink = ({ href, icon, label, exact = true }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
        isActive ? 'bg-[#F3F5F8] font-medium text-[#0E121B]' : 'text-[#2B303B] hover:bg-[#F3F5F8]',
      )}
    >
      <div className="flex items-center gap-2">
        <div className={cn(isActive && 'text-[#335CFF]')}>{icon}</div>

        <span>{label}</span>
      </div>

      {isActive && <Image src="/icon-chevron-right.svg" alt="chevron-right" width={20} height={20} />}
    </Link>
  );
};
