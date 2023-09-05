import { ComponentPropsWithRef, ReactNode, forwardRef } from "react";

type Props = ComponentPropsWithRef<"input"> & {
  label: string;
  errorMessage?: string;
  supportFields?: ReactNode[];
  isDisabled?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  props,
  ref
) {
  const {
    id,
    label,
    errorMessage,
    supportFields = [],
    isDisabled = false,
    ...restProps
  } = props;

  return (
    <div>
      <label htmlFor={id} className="block text-gray-500">
        {label}
      </label>
      {supportFields}
      <input
        ref={ref}
        {...restProps}
        id={id}
        className={`input input-bordered mt-2 w-full ${
          errorMessage ? "input-error" : ""
        }`}
        disabled={isDisabled}
      />
      {errorMessage && (
        <label htmlFor={id} className="block mt-2 text-error">
          {errorMessage}
        </label>
      )}
    </div>
  );
});

export default TextInput;
