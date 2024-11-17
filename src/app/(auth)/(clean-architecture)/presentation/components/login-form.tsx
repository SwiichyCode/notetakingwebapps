'use client';
import { useActionState } from 'react';

import { ButtonSubmit } from '@/components/ui/button-submit';
import { FormField } from '@/components/ui/form-field';

import { loginAction } from '../actions/login.action';
import { FormFieldPassword } from './form-field-password';

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
