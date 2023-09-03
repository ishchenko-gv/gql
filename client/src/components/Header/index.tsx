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
    `${
      pathname.startsWith(path) ? "text-accent" : ""
    } text-lg hover:text-accent`;

  return (
    <header>
      <nav className="container flex justify-between">
        <div>
          <Link to="/">
            <span style={{ fontSize: "32px" }}>
              <BsBook />
            </span>
          </Link>
        </div>
        <ul className="flex self-center">
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
        <div
          className="
            flex 
            items-center 
            justify-center 
            text-2xl 
            leading-reset 
            self-center
            w-8"
        >
          {userCtx.isLoading ? (
            <Loader />
          ) : userCtx.user ? (
            <UserMenu />
          ) : (
            <button
              tabIndex={0}
              className="btn btn-sm btn-ghost btn-circle"
              onClick={() => userCtx.showLoginFormModal()}
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
