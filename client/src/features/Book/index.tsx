import { gql, useQuery } from "@apollo/client";
import { Author } from "../../common/types";
import { Link } from "react-router-dom";

type Props = {
  id: string;
};

const GET_BOOK = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      _id
      title
      coverImgUrl
      authors {
        _id
        name
      }
    }
  }
`;

export default function Book(props: Props) {
  const { id } = props;

  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { id },
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>{error.toString()}</p>;

  return (
    <div className="prose">
      <h2>{data.book.title}</h2>
      <img
        src={data.book.coverImgUrl}
        width="240"
        height="320"
        role="presentation"
      />
      <ul>
        {data.book.authors.map((author: Author) => (
          <Link to={`/authors/${author._id}`}>
            <li>{author.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
