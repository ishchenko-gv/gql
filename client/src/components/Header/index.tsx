import { Link, useLocation } from "react-router-dom";
import { BsBook } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import Loader from "../Loader";
import UserMenu from "../UserMenu";
import { useContext } from "react";
import { UserContext } from "../../common/user";

export default function Header() {
  const userCtx = useContext(UserContext);
  const { pathname } = useLocation();

  const getClassNames = (path: string) =>
    `${pathname.startsWith(path) ? "link-secondary" : ""}`;

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
        <ul className="flex ml-40 self-center">
          <li>
            <Link to="/books/1">
              <span className={getClassNames("/books")}>Books</span>
            </Link>
          </li>
          <li className="ml-8">
            <Link to="/authors">
              <span className={getClassNames("/authors")}>Authors</span>
            </Link>
          </li>
        </ul>
        <div className="ml-auto text-2xl leading-reset self-center">
          {userCtx.isLoading ? (
            <Loader />
          ) : userCtx.user ? (
            <UserMenu />
          ) : (
            <button
              tabIndex={0}
              className="btn btn-sm btn-ghost btn-circle"
              onClick={() => userCtx.showSigninModal()}
            >
              <div className="w-10 rounded-full flex justify-center align-center text-2xl">
                <BiLogIn />
              </div>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
