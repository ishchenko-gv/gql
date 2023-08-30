import { Link, useLocation } from "react-router-dom";
import { BsBook } from "react-icons/bs";

export default function Header() {
  const { pathname } = useLocation();

  const getClassNames = (path: string) =>
    `link ${pathname.startsWith(path) ? "link-primary" : ""}`;

  return (
    <header>
      <nav className="container flex">
        <div>
          <Link to="/">
            <span style={{ fontSize: "32px" }}>
              <BsBook />
            </span>
          </Link>
        </div>
        <ul className="flex ml-40">
          <li>
            <Link to="/books">
              <span className={getClassNames("/books")}>Books</span>
            </Link>
          </li>
          <li className="ml-8">
            <Link to="/authors">
              <span className={getClassNames("/authors")}>Authors</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
