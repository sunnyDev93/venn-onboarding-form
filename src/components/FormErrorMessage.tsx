interface Props {
    message?: string | null;
  }
  
  export const FormErrorMessage = ({ message }: Props) => {
    if (!message) return null;
    return (
      <div className="text-red-600 bg-red-50 border border-red-300 p-3 rounded">
        {message}
      </div>
    );
  };
  