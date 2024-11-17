import { useFormStatus } from 'react-dom';

import { Button } from './button';

export const ButtonSubmit = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit">
      {pending ? 'Submitting...' : children}
    </Button>
  );
};
