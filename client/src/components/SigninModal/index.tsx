import { useContext, useState } from "react";
import { UserContext } from "../../common/user";

export default function SigninModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userCtx = useContext(UserContext);

  return (
    <dialog ref={userCtx.signinModalRef} className="modal">
      <div className="modal-box w-auto">
        <form method="dialog" className="modal-action">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form>
          <h3 className="font-bold text-lg">Signin</h3>
          <div className="mt-4">
            <label className="block">email</label>
            <input
              className="input input-bordered mt-2"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block">password</label>
            <input
              className="input input-bordered mt-2"
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="btn w-full"
              onClick={() => userCtx.signin(email, password)}
            >
              Signin
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
