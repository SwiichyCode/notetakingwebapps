'use client';

import { useFormStatus } from 'react-dom';

import { Button, type ButtonProps } from './button';

interface ButtonSubmitProps extends ButtonProps {
  children: React.ReactNode;
}

export const ButtonSubmit = ({ children, ...props }: ButtonSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit" {...props}>
      {pending ? 'Submitting...' : children}
    </Button>
  );
};
