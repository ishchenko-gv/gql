import { gql, useQuery } from "@apollo/client";

type Props = {
  id: string;
};

const GET_AUTHOR = gql`
  query getAuthor($id: ID!) {
    author(id: $id) {
      _id
      name
    }
  }
`;

export default function Author(props: Props) {
  const { id } = props;

  const { data, loading, error } = useQuery(GET_AUTHOR, { variables: { id } });

  if (loading) return <p>loading</p>;
  if (error) return <p>{error.toString()}</p>;

  return (
    <div className="prose">
      <h2>{data.author.name}</h2>
    </div>
  );
}
