import { useQuery, gql } from "@apollo/client";
import { Book, Author } from "../../common/types";
import { Link } from "react-router-dom";

const GET_BOOKS = gql`
  query getBooks {
    books {
      _id
      title
      authors {
        _id
        name
      }
      coverImgUrl
    }
  }
`;

export default function BooksList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-3 gap-12">
      {data.books.map((book: Book) => (
        <div key={book._id}>
          <div className="hover:underline">
            <Link to={`/books/${book._id}`}>
              <img
                src={book.coverImgUrl}
                className="m-0 rounded-md"
                width="240"
                height="320"
              />
              <h3 className="text-xl mt-4">{book.title}</h3>
            </Link>
          </div>
          <ul>
            {book.authors.map((author: Author) => (
              <li key={author._id} className="text-sm mt-2">
                <Link to={`/authors/${author._id}`}>
                  <span className="hover:underline">{author.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
