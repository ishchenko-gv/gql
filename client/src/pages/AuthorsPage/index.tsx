import { gql, useQuery } from "@apollo/client";
import { Author } from "../../common/types";
import AuthorCard from "../../components/AuthorCard";
import { Link } from "react-router-dom";

const GET_AUTHORS = gql`
  query getAuthors {
    authors {
      _id
      name
      photoImgUrl
    }
  }
`;

export default function AuthorsPage() {
  const { data, loading, error } = useQuery(GET_AUTHORS);

  if (loading) return <p>loading</p>;
  if (error) return <p>{error.toString()}</p>;

  return (
    <div className="grid grid-cols-3 gap-8">
      {[...data.authors]
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
        .map((author: Author) => (
          <Link to={`/author/${author._id}`}>
            <AuthorCard author={author} />
          </Link>
        ))}
    </div>
  );
}
