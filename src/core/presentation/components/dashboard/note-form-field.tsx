import { cva, type VariantProps } from 'class-variance-authority';
import type { Control } from 'react-hook-form';

import { cn } from '@/config/libs/utils';

import { InputForm } from '../common/ui/input-form';

const noteFormFieldVariants = cva('border-none shadow-none focus-visible:ring-0', {
  variants: {
    variant: {
      title:
        'w-[70%] [&_input]:text-2xl [&_input]:font-bold [&_input]:text-[#0E121B] [&_input]:placeholder:text-[#0E121B]',
      detail: 'w-[70%] [&_input]:text-[#0E121B] [&_input]:placeholder:text-[#99A0AE]',
      edited: 'w-[70%] [&_input]:text-[#0E121B] [&_input]:placeholder:text-[#99A0AE] [&_input]:disabled:bg-transparent',
    },
  },
});

interface NoteFormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof noteFormFieldVariants> {
  control?: Control<any>;
  name: string;
}

export const NoteFormField = ({ control, name, className, variant, ...props }: NoteFormFieldProps) => {
  return (
    <div className="flex w-full">
      <InputForm
        control={control}
        name={name}
        className={cn(noteFormFieldVariants({ variant, className }))}
        showError={false}
        {...props}
      />
    </div>
  );
};
