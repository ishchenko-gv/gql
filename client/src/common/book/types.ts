import { Author } from "../author/types";

export type Book = {
  _id: string;
  title: string;
  authors: Author[];
  coverImgUrl: string;
};
