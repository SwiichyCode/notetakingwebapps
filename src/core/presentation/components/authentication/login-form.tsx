'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';
import { LoginFormSchema } from '@/core/presentation/schemas/auth-form.schema';

import { loginAction } from '../../actions/login.action';
import { Form } from '../common/ui/form';
import { InputForm } from '../common/ui/input-form';

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    startTransition(async () => {
      const payload = await loginAction(values);

      if (payload?.serverError) {
        setErrorMessage(payload.serverError);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-4">
          <InputForm control={form.control} label="Email Address" name="email" type="text" />
          <InputForm control={form.control} label="Password" name="password" type="password" />

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <ButtonSubmit isPending={isPending}>Login</ButtonSubmit>
        </div>
      </form>
    </Form>
  );
};
