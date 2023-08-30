import { useParams } from "react-router-dom";
import Author from "../../features/Author";
import BooksByAuthor from "../../features/BooksByAuthor";

export default function AuthorPage() {
  const { id } = useParams();

  return (
    <>
      <Author id={id!} />
      <BooksByAuthor authorId={id!} />
    </>
  );
}
