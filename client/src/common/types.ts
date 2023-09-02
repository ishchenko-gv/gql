import { RefObject } from "react";

export type User = {
  _id: string;
  email: string;
};

export type UserCtx = {
  user: User | null;
  isLoading: boolean;
  signinModalRef: RefObject<HTMLDialogElement>;
  showSigninModal: () => void;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
};

export type Author = {
  _id: string;
  name: string;
  photoImgUrl: string;
};

export type Book = {
  _id: string;
  title: string;
  authors: Author[];
  coverImgUrl: string;
};
