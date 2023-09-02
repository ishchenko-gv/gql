import { useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { UserContext } from "../../common/user";

export default function UserMenu() {
  const userCtx = useContext(UserContext);

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
        <div className="w-10 rounded-full flex justify-center align-center text-2xl">
          <AiOutlineUser />
        </div>
      </button>
      <div
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <div className="ml-3">{userCtx.user?.email}</div>
        <ul className="mt-2">
          <li>
            <button type="button" onClick={userCtx.signout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
