import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import BooksGrid from "../../components/BooksGrid";
import EntityDescription from "../../components/EntityDescription";

const GET_AUTHOR = gql`
  query getAuthor($id: ID!) {
    author(id: $id) {
      name
      biography
      photoImgUrl
    }
  }
`;

const GET_BOOKS_BY_AUTHOR = gql`
  query getBookByAuthor($authorId: ID!) {
    booksByAuthor(authorId: $authorId) {
      _id
      title
      coverImgUrl
    }
  }
`;

export default function AuthorPage() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_AUTHOR, { variables: { id } });

  const {
    data: booksData,
    loading: booksLoading,
    error: booksError,
  } = useQuery(GET_BOOKS_BY_AUTHOR, {
    variables: { authorId: id },
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>{error.toString()}</p>;

  return (
    <>
      <EntityDescription
        title={data.author.name}
        description={data.author.biography}
        imgUrl={data.author.photoImgUrl}
      />
      <div className="mt-16">
        <h3 className="text-2xl mb-4">By author</h3>
        {booksLoading ? (
          <p>loading...</p>
        ) : booksError ? (
          <p>error</p>
        ) : (
          <BooksGrid books={booksData.booksByAuthor} />
        )}
      </div>
    </>
  );
}
