import { useFormContext } from "react-hook-form";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface Props {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  onBlur?: () => void;
}

export const InputField = ({ name, label, type = "text", placeholder, onBlur }: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <FormFieldWrapper label={label} error={error}>
      <input
        {...register(name)}
        onBlur={async () => {
          await trigger(name);
          onBlur?.();
        }}
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </FormFieldWrapper>
  );
};
