'use client';

import { useActionState } from 'react';

import { ButtonSubmit } from '@/components/ui/button-submit';
import { FormField } from '@/components/ui/form-field';

import { forgotPasswordAction } from '../actions/forgot-password.action';

export const ForgotPasswordForm = () => {
  const [state, action] = useActionState(forgotPasswordAction, undefined);

  return (
    <form action={action} className="w-full">
      <div className="flex flex-col gap-4">
        <FormField
          label="Email Address"
          name="email"
          type="email"
          error={state?.errors?.email}
          placeholder="email@example.com"
        />

        <ButtonSubmit>Send Reset Link</ButtonSubmit>
      </div>

      {state?.message && (
        <p className={`mt-4 text-sm ${state.success ? 'text-green-500' : 'text-red-500'}`}>{state.message}</p>
      )}
    </form>
  );
};
