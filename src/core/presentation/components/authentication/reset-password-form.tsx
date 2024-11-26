'use client';

import { useActionState } from 'react';

import { resetPasswordAction } from '@/core/presentation/actions/reset-password.action';
import { FormFieldPassword } from '@/core/presentation/components/authentication/form-field-password';
import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [state, action] = useActionState(resetPasswordAction, undefined);

  return (
    <form action={action} className="w-full">
      <input type="hidden" name="token" value={token} />

      <div className="flex flex-col gap-4">
        <FormFieldPassword status="reset" label="New Password" name="password" error={state?.errors?.password} />

        <FormFieldPassword
          status="reset"
          label="Confirm New Password"
          name="confirmPassword"
          error={state?.errors?.confirmPassword}
          showInfo={false}
        />

        <ButtonSubmit>Reset Password</ButtonSubmit>
      </div>

      {state?.message && (
        <p className={`mt-4 text-sm ${state.success ? 'text-green-500' : 'text-red-500'}`}>{state.message}</p>
      )}
    </form>
  );
};