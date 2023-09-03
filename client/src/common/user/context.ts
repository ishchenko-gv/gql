import { createContext, createRef } from "react";
import { UserCtx } from "./types";

export default createContext<UserCtx>({
  user: null,
  isLoading: false,
  errors: [],
  signinModalRef: createRef(),
  showSigninModal() {},
  signup: async () => {},
  signin: async () => {},
  signout: async () => {},
});
