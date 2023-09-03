import { Book, Author } from "../../common/types";
import { Link } from "react-router-dom";

type Props = {
  book: Book;
};

export default function BookCard(props: Props) {
  const { _id, title, coverImgUrl, authors } = props.book;

  return (
    <div
      className="
      card
      shadow-md
     bg-gray-800
      hover:-translate-y-2 
      hover:shadow-2xl
      transition-all 
      duration-200
      "
    >
      <figure>
        <Link to={`/book/${_id}`}>
          <img src={coverImgUrl} width="240" height="320" />
        </Link>
      </figure>
      <div className="card-body">
        <Link to={`/book/${_id}`}>
          <h2 className="card-title hover:text-accent">{title}</h2>
        </Link>
        {authors && (
          <ul>
            {authors.map((author: Author) => (
              <li key={author._id} className="text-sm mt-2">
                <Link to={`/author/${author._id}`}>
                  <span className="hover:text-accent">{author.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
