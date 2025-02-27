'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Control } from 'react-hook-form';

import { routes } from '@/config/routes';
import { Label } from '@/core/presentation/components/common/ui/label';

import { InputForm } from '../common/ui/input-form';

interface FormFieldPasswordProps extends React.ComponentProps<'input'> {
  control?: Control<any>;
  label: string;
  name: string;
  status: 'login' | 'signup' | 'reset';
  showInfo?: boolean;
  error?: string[];
}

export const FormFieldPassword = ({
  control,
  label,
  name,
  status,
  showInfo = true,
  ...props
}: FormFieldPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex items-center justify-between">
        <Label htmlFor="password">{label}</Label>
        {status === 'login' && (
          <Link href={routes['forgot-password']} className="text-sm text-muted-foreground underline">
            Forgot
          </Link>
        )}
      </div>
      <div className="relative">
        <InputForm control={control} name={name} type={showPassword ? 'text' : 'password'} {...props} />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <Image
            src={showPassword ? '/icon-hide-password.svg' : '/icon-show-password.svg'}
            alt="eye"
            width={20}
            height={20}
          />
        </button>
      </div>

      {showInfo && (
        <div className="flex items-center gap-1">
          <Image src="/icon-info.svg" alt="info" width={16} height={16} />
          <p className="text-sm text-muted-foreground">At least 8 characters</p>
        </div>
      )}
    </div>
  );
};
