import type { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className="flex h-screen w-screen items-center justify-center bg-[#F3F5F8]">{children}</div>;
}
