import { RefObject } from "react";

export type User = {
  _id: string;
  email: string;
};

export type UserApiError = {
  message: string;
};

export type UserCtx = {
  user: User | null;
  isLoading: boolean;
  errors: UserApiError[];
  loginFormModalRef: RefObject<HTMLDialogElement>;
  showLoginFormModal: () => void;
  signup: (email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signupGoogle: () => Promise<void>;
  signout: () => Promise<void>;
};
