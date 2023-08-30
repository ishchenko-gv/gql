export type Author = {
  _id: string;
  name: string;
};

export type Book = {
  _id: string;
  title: string;
  authors: Author[];
  coverImgUrl: string;
};
