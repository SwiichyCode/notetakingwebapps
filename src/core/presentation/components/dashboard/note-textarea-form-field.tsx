import type { Control } from 'react-hook-form';

import { cn } from '@/config/libs/utils';

import { TextAreaForm } from '../common/ui/textarea-form';

interface NoteTextareaFormFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  control?: Control<any>;
  name: string;
}

export const NoteTextareaFormField = ({ control, name, className, ...props }: NoteTextareaFormFieldProps) => {
  return (
    <div className="flex-1">
      <TextAreaForm
        control={control}
        name={name}
        className={cn(
          'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent h-full w-full flex-1 resize-none border-none bg-transparent py-4 text-sm text-[#232530] outline-none placeholder:text-[#99A0AE] focus-visible:ring-0',
          className,
        )}
        showError={false}
        {...props}
      />
    </div>
  );
};
