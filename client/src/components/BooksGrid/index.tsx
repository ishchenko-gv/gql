import { Book } from "../../common/types";
import BookCard from "../BookCard";

type Props = {
  books: Book[];
};

export default function BooksGrid(props: Props) {
  const { books } = props;

  return (
    <div className="grid grid-cols-3 gap-8">
      {books.map((book: Book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
