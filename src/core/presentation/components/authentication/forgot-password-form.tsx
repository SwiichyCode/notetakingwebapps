'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';

import { forgotPasswordAction } from '../../actions/forgot-password.action';
import { ForgotPasswordSchema } from '../../schemas/auth-form.schema';
import { Form } from '../common/ui/form';
import { InputForm } from '../common/ui/input-form';

export const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    startTransition(async () => {
      const payload = await forgotPasswordAction(data);

      if (payload?.serverError) {
        setErrorMessage(payload.serverError);
      } else {
        setSuccessMessage('If an account exists with this email, you will receive a password reset link.');
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-4">
          <InputForm
            control={form.control}
            label="Email Address"
            name="email"
            type="email"
            placeholder="email@example.com"
          />

          <ButtonSubmit isPending={isPending}>Send Reset Link</ButtonSubmit>
        </div>

        {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}
        {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage}</p>}
      </form>
    </Form>
  );
};
