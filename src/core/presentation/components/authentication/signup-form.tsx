'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormFieldPassword } from '@/core/presentation/components/authentication/form-field-password';
import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';

import { signupAction } from '../../actions/signup.action';
import { SignupFormSchema } from '../../schemas/auth-form.schema';
import { Form } from '../common/ui/form';
import { InputForm } from '../common/ui/input-form';

export const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    startTransition(async () => {
      const payload = await signupAction(values);

      if (payload?.serverError) {
        setErrorMessage(payload?.serverError);
      } else {
        setSuccessMessage('Please check your email to verify your account.');
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="flex flex-col gap-4">
          <InputForm control={form.control} label="Email Address" name="email" type="text" />
          <FormFieldPassword control={form.control} status="signup" label="Password" name="password" />

          <ButtonSubmit isPending={isPending}>Signup</ButtonSubmit>
        </div>
        {successMessage && <p className="text-center text-sm text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-center text-sm text-red-500">{errorMessage}</p>}
      </form>
    </Form>
  );
};
