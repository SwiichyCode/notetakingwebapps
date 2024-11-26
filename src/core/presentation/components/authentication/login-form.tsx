'use client';
import { useActionState } from 'react';

import { loginAction } from '@/core/presentation/actions/login.action';
import { FormFieldPassword } from '@/core/presentation/components/authentication/form-field-password';
import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';
import { FormField } from '@/core/presentation/components/common/ui/form-field';

export const LoginForm = () => {
  const [state, action] = useActionState(loginAction, undefined);

  return (
    <form action={action} className="w-full">
      <div className="flex flex-col gap-4">
        <FormField label="Email Address" name="email" type="text" error={state?.errors?.email} />

        <FormFieldPassword status="login" label="Password" name="password" error={state?.errors?.password} />

        {state?.message && <p className="text-red-500">{state.message}</p>}

        <ButtonSubmit>Login</ButtonSubmit>
      </div>
    </form>
  );
};
