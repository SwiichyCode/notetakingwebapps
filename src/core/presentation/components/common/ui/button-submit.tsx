'use client';

import { Button, type ButtonProps } from './button';

interface ButtonSubmitProps extends ButtonProps {
  isPending?: boolean;
  children: React.ReactNode;
}

export const ButtonSubmit = ({ isPending, children, ...props }: ButtonSubmitProps) => {
  return (
    <Button aria-disabled={isPending} type="submit" {...props}>
      {isPending ? 'Submitting...' : children}
    </Button>
  );
};
