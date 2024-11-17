import Image from 'next/image';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import { routes } from '@/routes';

type AuthCardProps = PropsWithChildren<{
  status: 'login' | 'signup' | 'verify-email' | 'forgot-password' | 'reset-password';
}>;

const CONTENT_MAP = {
  login: {
    title: 'Welcome to Note',
    description: 'Please log in to continue',
    link: {
      sub: 'No account yet?',
      text: 'Sign up',
      href: routes.signup,
    },
  },
  signup: {
    title: 'Create Your Account',
    description: 'Sign up to start organizing your notes and boost your productivity.',
    link: {
      sub: 'Already have an account?',
      text: 'Login',
      href: routes.login,
    },
  },
  'verify-email': {
    title: 'Email Verified Successfully!',
    description: 'You can now log in to your account.',
    link: undefined,
  },
  'forgot-password': {
    title: 'Forgotten your password?',
    description: 'Enter your email below, and we’ll send you a link to reset it.',
    link: undefined,
  },
  'reset-password': {
    title: 'Reset Your Password',
    description: 'Choose a new password to secure your account.',
    link: undefined,
  },
} as const;

export const AuthCard = ({ status, children }: AuthCardProps) => {
  const { title, description, link } = CONTENT_MAP[status];

  return (
    <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-xl border border-[#E0E4EA] bg-white p-12 shadow-sm">
      <Image src="/logo.svg" alt="Note logo" width={95} height={28} priority className="mb-6" />

      <div className="mb-10 space-y-1 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {children}

      {link && <div className="my-4 h-[1px] w-full bg-border" />}

      {link && (
        <div className="flex items-center justify-center gap-1 text-center">
          <p className="text-sm text-muted-foreground">{link.sub}</p>
          <Link className="text-sm text-primary underline" href={link.href}>
            {link.text}
          </Link>
        </div>
      )}
    </div>
  );
};
