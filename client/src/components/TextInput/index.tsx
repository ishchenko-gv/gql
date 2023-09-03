import { ComponentPropsWithRef, forwardRef, useState } from "react";

type Props = Omit<ComponentPropsWithRef<"input">, "onChange"> & {
  isValid?: boolean;
  isFluid?: boolean;
  // onChange: (value: string) => void;
  onBlur?: () => void;
};

const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { isValid, isFluid, onBlur, ...restProps } = props;
  const [isTouched, setIsTouched] = useState(false);

  console.log(props);

  return (
    <input
      {...restProps}
      ref={ref}
      className={`input input-bordered mt-2 ${
        !isValid && isTouched ? "input-error" : ""
      } ${isFluid ? "w-full" : ""}`}
      // onChange={(e) => onChange(e.target.value)}
      onBlur={() => {
        setIsTouched(true);
        onBlur?.();
      }}
    />
  );
});

export default TextInput;
