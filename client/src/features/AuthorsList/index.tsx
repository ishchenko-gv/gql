import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Author } from "../../common/types";

const GET_AUTHORS = gql`
  query getAuthors {
    authors {
      _id
      name
    }
  }
`;

export default function AuthorsList() {
  const { data, loading, error } = useQuery(GET_AUTHORS);

  if (loading) return <p>loadin</p>;
  if (error) return <p>{error.toString()}</p>;

  return (
    <ul>
      {data.authors.map((author: Author) => (
        <li key={author._id}>
          <Link to={`/authors/${author._id}`}>{author.name}</Link>
        </li>
      ))}
    </ul>
  );
}
