'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { Form, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormFieldPassword } from '@/core/presentation/components/authentication/form-field-password';
import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';

import { resetPasswordActionClient } from '../../actions/reset-password.action';
import { ResetPasswordFormSchema } from '../../schemas/auth-form.schema';

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof ResetPasswordFormSchema>) {
    startTransition(async () => {
      const payload = await resetPasswordActionClient(values);

      if (payload?.serverError) {
        setErrorMessage(payload.serverError);
      } else {
        setSuccessMessage('Password reset successful');
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <input type="hidden" name="token" value={token} />

        <div className="flex flex-col gap-4">
          <FormFieldPassword control={form.control} status="reset" label="New Password" name="password" />

          <FormFieldPassword
            control={form.control}
            status="reset"
            label="Confirm New Password"
            name="confirmPassword"
            showInfo={false}
          />

          <ButtonSubmit isPending={isPending}>Reset Password</ButtonSubmit>
        </div>

        {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage}</p>}
        {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}
      </form>
    </Form>
  );
};
