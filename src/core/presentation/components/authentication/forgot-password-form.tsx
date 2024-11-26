'use client';

import { useActionState } from 'react';

import { forgotPasswordAction } from '@/core/presentation/actions/forgot-password.action';
import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';
import { FormField } from '@/core/presentation/components/common/ui/form-field';

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
