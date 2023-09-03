import { useContext, useEffect, useRef, useState } from "react";
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
  const [isEmailSignupVisible, setIsEmailSignupVisible] = useState(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const userCtx = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const { ref: emailRHFRef, ...restEmailInputProps } = register("email", {
    required: true,
    pattern: {
      // eslint-disable-next-line
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Incorrect email",
    },
  });

  const passwordInputProps = register("password", {
    required: true,
    minLength: {
      value: 8,
      message: "Password should contain at least 8 characters",
    },
  });

  function onSubmit({ email, password }: LoginForm) {
    if (mode === Mode.Signup) {
      userCtx.signup(email, password);
    } else {
      userCtx.signin(email, password);
    }
  }

  useEffect(() => {
    emailInputRef.current?.focus();
  }, [isEmailSignupVisible]);

  return (
    <dialog ref={userCtx.loginFormModalRef} className="modal">
      <div className="modal-box w-96">
        <form method="dialog" className="modal-action">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <a href="http://localhost:5005/auth/google" className="btn w-full">
          Sign up with Google
        </a>
        <div className="divider">OR</div>
        {!isEmailSignupVisible && (
          <button
            className="btn w-full"
            onClick={() => setIsEmailSignupVisible(true)}
          >
            Continue with email
          </button>
        )}
        {isEmailSignupVisible && (
          <>
            <div className="tabs tabs-boxed flex">
              <a
                className={`tab ${
                  mode === Mode.Signup ? "tab-active" : ""
                } flex-1`}
                onClick={() => setMode(Mode.Signup)}
              >
                I'm a new user
              </a>
              <a
                className={`tab ${
                  mode === Mode.Signin ? "tab-active" : ""
                } flex-1`}
                onClick={() => setMode(Mode.Signin)}
              >
                I have an account
              </a>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <TextInput
                  {...restEmailInputProps}
                  ref={(e) => {
                    emailRHFRef(e);
                    emailInputRef.current = e;
                  }}
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
                  {...passwordInputProps}
                  key={mode}
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
          </>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
