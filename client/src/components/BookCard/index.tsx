import { Book, Author } from "../../common/types";
import { Link } from "react-router-dom";

type Props = {
  book: Book;
};

export default function BookCard(props: Props) {
  const { _id, title, coverImgUrl, authors } = props.book;

  return (
    <div>
      <div className="hover:underline">
        <Link to={`/book/${_id}`}>
          <img
            src={coverImgUrl}
            className="m-0 rounded-md"
            width="240"
            height="320"
          />
          <h3 className="text-xl mt-4">{title}</h3>
        </Link>
      </div>
      {authors && (
        <ul>
          {authors.map((author: Author) => (
            <li key={author._id} className="text-sm mt-2">
              <Link to={`/author/${author._id}`}>
                <span className="hover:underline">{author.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
