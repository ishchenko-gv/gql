import { useContext } from "react";
import { UserContext } from "../../common/user";
import { useForm } from "react-hook-form";
import TextInput from "../TextInput";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginFormModal() {
  const userCtx = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  console.log(errors);

  return (
    <dialog ref={userCtx.loginFormModalRef} className="modal">
      <div className="modal-box w-96">
        <form method="dialog" className="modal-action">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <h3 className="font-bold text-lg">Signin</h3>
          <div className="mt-4">
            <TextInput
              {...register("email", {
                required: true,
                pattern: {
                  // eslint-disable-next-line
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Incorrect email",
                },
              })}
              id="login-form-email"
              type="email"
              name="email"
              label="email"
              autoComplete="email"
              errorMessage={errors.email?.message}
            />
          </div>
          <div className="mt-4">
            <TextInput
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password should contain at least 8 characters",
                },
              })}
              id="login-form-password"
              type="password"
              name="password"
              label="password"
              autoComplete="current-password"
              errorMessage={errors.password?.message}
            />
          </div>
          <div className="mt-4">
            <button type="submit" className="btn w-full">
              Signin
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
