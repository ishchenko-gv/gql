import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      author
      title
    }
  }
`;

type Book = {
  title: string;
  author: string;
};

export default function DisplayBooks() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return data.books.map((book: Book) => (
    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  ));
}
