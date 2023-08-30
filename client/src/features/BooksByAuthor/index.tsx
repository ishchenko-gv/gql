import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Book } from "../../common/types";

type Props = {
  authorId: string;
};

const GET_BOOK_BY_AUTHOR = gql`
  query getBookByAuthor($authorId: ID!) {
    booksByAuthor(authorId: $authorId) {
      _id
      title
    }
  }
`;

export default function BooksByAuthor(props: Props) {
  const { authorId } = props;

  const { data, loading, error } = useQuery(GET_BOOK_BY_AUTHOR, {
    variables: { authorId },
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>{error.toString()}</p>;

  return (
    <ul>
      {data.booksByAuthor.map((book: Book) => (
        <Link to={`/books/${book._id}`}>
          <li key={book._id}>{book.title}</li>
        </Link>
      ))}
    </ul>
  );
}
