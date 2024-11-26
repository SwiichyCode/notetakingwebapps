import { cn } from '@/config/libs/utils';

interface NoteTextareaFormFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const NoteTextareaFormField = ({ className, ...props }: NoteTextareaFormFieldProps) => {
  return (
    <div className="flex-1">
      <textarea
        className={cn(
          'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent h-full w-full flex-1 resize-none bg-transparent py-4 text-sm text-[#232530] outline-none placeholder:text-[#99A0AE]',
          className,
        )}
        {...props}
      />
    </div>
  );
};
