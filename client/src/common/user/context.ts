import { createContext, createRef } from "react";
import { UserCtx } from "./types";

export default createContext<UserCtx>({
  user: null,
  isLoading: false,
  errors: [],
  loginFormModalRef: createRef(),
  showLoginFormModal() {},
  signup: async () => {},
  signin: async () => {},
  signout: async () => {},
});
