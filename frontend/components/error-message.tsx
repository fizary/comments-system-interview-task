type ErrorMessageProps = {
  errors: string[];
};

export const ErrorMessage = ({ errors }: ErrorMessageProps) => {
  return (
    <div className="text-destructive border border-destructive rounded-sm p-1 px-2">
      {errors.map((error) => (
        <div key={error}>{error}</div>
      ))}
    </div>
  );
};
