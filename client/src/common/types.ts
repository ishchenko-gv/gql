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
