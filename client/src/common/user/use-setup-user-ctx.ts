import { useEffect, useRef, useState } from "react";
import { User } from "../types";

export default function useSetupUserCtx() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const signinModalRef = useRef<HTMLDialogElement>(null);

  function showSigninModal() {
    signinModalRef.current?.showModal();
  }

  function closeSigninModal() {
    signinModalRef.current?.close();
  }

  async function signin(email: string, password: string) {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5005/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      setUser(await res.json());
      closeSigninModal();
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  }

  async function signout() {
    setIsLoading(true);

    try {
      await fetch("http://localhost:5005/auth/signout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetch("http://localhost:5005/auth/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((userData) => {
        if (userData._id) setUser(userData);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return {
    user,
    isLoading,
    signinModalRef,
    showSigninModal,
    signin,
    signout,
  };
}
