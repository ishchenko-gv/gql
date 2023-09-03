import { useContext, useState } from "react";
import { UserContext } from "../../common/user";
import { useForm } from "react-hook-form";
import TextInput from "../TextInput";
import Loader from "../Loader";

enum Mode {
  Signup,
  Signin,
}

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginFormModal() {
  const [mode, setMode] = useState(Mode.Signup);
  const userCtx = useContext(UserContext);

  console.log(userCtx.errors);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  function onSubmit({ email, password }: LoginForm) {
    if (mode === Mode.Signup) {
      userCtx.signup(email, password);
    } else {
      userCtx.signin(email, password);
    }
  }

  return (
    <dialog ref={userCtx.loginFormModalRef} className="modal">
      <div className="modal-box w-96">
        <form method="dialog" className="modal-action">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="tabs tabs-boxed flex">
          <a
            className={`tab ${mode === Mode.Signup ? "tab-active" : ""} flex-1`}
            onClick={() => setMode(Mode.Signup)}
          >
            I'm a new user
          </a>
          <a
            className={`tab ${mode === Mode.Signin ? "tab-active" : ""} flex-1`}
            onClick={() => setMode(Mode.Signin)}
          >
            I have an account
          </a>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <TextInput
              {...register("email", {
                required: true,
                pattern: {
                  // eslint-disable-next-line
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
              autoComplete={
                mode === Mode.Signup ? "new-password" : "current-password"
              }
              errorMessage={errors.password?.message}
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="btn w-full"
              disabled={userCtx.isLoading}
            >
              {userCtx.isLoading ? (
                <Loader />
              ) : mode === Mode.Signup ? (
                "Sign up"
              ) : (
                "Sign in"
              )}
            </button>
          </div>
          {!!userCtx.errors.length && (
            <ul className="mt-4">
              {userCtx.errors.map((error) => (
                <li className="text-error">{error.message}</li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
