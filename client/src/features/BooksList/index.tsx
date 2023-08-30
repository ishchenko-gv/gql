import { useQuery, gql } from "@apollo/client";
import { Book, Author } from "../../common/types";
import { Link } from "react-router-dom";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      _id
      title
      authors {
        _id
        name
      }
    }
  }
`;
export default function BooksList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return data.books.map((book: Book) => (
    <div key={book._id}>
      <Link to={`/books/${book._id}`}>
        <h3>{book.title}</h3>
      </Link>
      <ul>
        {book.authors.map((author: Author) => (
          <li key={author._id}>{author.name}</li>
        ))}
      </ul>
    </div>
  ));
}
