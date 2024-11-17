import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormFieldProps extends React.ComponentProps<'input'> {
  label: string;
  error?: string[];
}

export const FormField = ({ label, error, ...props }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-[6px]">
      <Label htmlFor={props.name}>{label}</Label>
      <Input {...props} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
