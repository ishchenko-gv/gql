import { createContext, createRef } from "react";
import { UserCtx } from "../types";

export default createContext<UserCtx>({
  user: null,
  isLoading: false,
  signinModalRef: createRef(),
  showSigninModal() {},
  signin: async () => {},
  signout: async () => {},
});
