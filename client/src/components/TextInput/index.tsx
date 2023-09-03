import { ComponentPropsWithRef, forwardRef } from "react";

type Props = ComponentPropsWithRef<"input"> & {
  label: string;
  errorMessage?: string;
};

const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { id, label, errorMessage, ...restProps } = props;

  return (
    <div>
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        ref={ref}
        {...restProps}
        id={id}
        className={`input input-bordered mt-2 w-full ${
          errorMessage ? "input-error" : ""
        }`}
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
