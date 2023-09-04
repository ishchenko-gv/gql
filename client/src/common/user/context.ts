import { createContext, createRef } from "react";
import { UserCtx } from "./types";

export default createContext<UserCtx>({
  user: null,
  isLoading: false,
  errors: [],
  loginFormModalRef: createRef(),
  showLoginFormModal() {},
  isPreviouslyLoggedIn: false,
  signup: async () => {},
  signin: async () => {},
  signout: async () => {},
});
