'use client';

import { useActionState } from 'react';

import { signupAction } from '@/core/presentation/actions/signup.action';
import { FormFieldPassword } from '@/core/presentation/components/authentication/form-field-password';
import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';
import { FormField } from '@/core/presentation/components/common/ui/form-field';

export const SignupForm = () => {
  const [state, action] = useActionState(signupAction, undefined);

  return (
    <form action={action} className="w-full space-y-4">
      <div className="flex flex-col gap-4">
        <FormField label="Email Address" name="email" type="text" error={state?.errors?.email} />

        <FormFieldPassword status="signup" label="Password" name="password" error={state?.errors?.password} />

        <ButtonSubmit>Signup</ButtonSubmit>
      </div>

      {state?.message && <p className="text-center text-sm text-green-500">{state.message}</p>}
    </form>
  );
};
