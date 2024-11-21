import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const noteFormFieldVariants = cva('outline-none', {
  variants: {
    variant: {
      title: 'w-[70%] text-2xl font-bold text-[#0E121B] placeholder:text-[#0E121B]',
      detail: 'w-[70%] text-[#0E121B] placeholder:text-[#99A0AE]',
      edited: 'w-[70%] text-[#0E121B] placeholder:text-[#99A0AE] disabled:bg-transparent',
    },
  },
});

interface NoteFormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof noteFormFieldVariants> {}

export const NoteFormField = ({ className, variant, ...props }: NoteFormFieldProps) => {
  return (
    <div className="flex w-full">
      <input className={cn(noteFormFieldVariants({ variant, className }))} {...props} />
    </div>
  );
};
