import { useContext } from "react";
import { UserContext } from "../../common/user";

export default function ProfilePage() {
  const userCtx = useContext(UserContext);

  return (
    <div>
      <h2 className="text-2xl">{userCtx.user?.email}</h2>
      <p>{userCtx.user?._id}</p>
    </div>
  );
}
