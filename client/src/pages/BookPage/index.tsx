import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import EntityDescription from "../../components/EntityDescription";
import { Author } from "../../common/types";
import AuthorCard from "../../components/AuthorCard";

const GET_BOOK = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      title
      description
      coverImgUrl
      authors {
        _id
        name
        photoImgUrl
      }
    }
  }
`;

export default function BookPage() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_BOOK, { variables: { id } });

  if (loading) return <p>loading</p>;
  if (error) return <p>{error.toString()}</p>;
  if (!data.book) return <p>There is no such book</p>;

  return (
    <>
      <EntityDescription
        title={data.book.title}
        description={data.book.description}
        imgUrl={data.book.coverImgUrl}
      />
      <h3 className="mt-12 text-2xl">Authors</h3>
      <div className="mt-8 grid grid-cols-3 gap-8">
        {data.book.authors.map((author: Author) => (
          <Link to={`/author/${author._id}`}>
            <AuthorCard author={author} />
          </Link>
        ))}
      </div>
    </>
  );
}
