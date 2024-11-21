export const ErrorMessage = ({ message }: { message: string[] }) => {
  return <p className="text-sm text-red-500">{message.join(', ')}</p>;
};
