import { useParams } from "react-router-dom";
import Book from "../../features/Book";

export default function BookPage() {
  const { id } = useParams();

  return <Book id={id!} />;
}
