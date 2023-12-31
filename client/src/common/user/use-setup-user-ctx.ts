import { useEffect, useRef, useState } from "react";
import { User, UserApiError, UserCtx } from "./types";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/local-storage";

export default function useSetupUserCtx() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [errors, setErrors] = useState<UserApiError[]>([]);
  const loginFormModalRef = useRef<HTMLDialogElement>(null);

  function showLoginFormModal() {
    loginFormModalRef.current?.showModal();
  }

  function closeLoginFormModal() {
    loginFormModalRef.current?.close();
  }

  function markLoggingIn() {
    setLocalStorageItem("previously-logged-in", "1");
  }

  function checkLoggingInMark() {
    return getLocalStorageItem("previously-logged-in") === "1";
  }

  async function signup(email: string, password: string) {
    setIsLoading(true);
    setErrors([]);

    let res;

    try {
      res = await fetch("http://localhost:5005/auth/signup", {
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
    } catch (err) {
      console.error(err);
    }

    const json = await res?.json();

    if (!res?.ok) {
      if (json?.errors) {
        setErrors(json.errors || []);
      }

      setIsLoading(false);

      return;
    }

    setUser(json);
    closeLoginFormModal();
    setIsLoading(false);
    markLoggingIn();
  }

  async function signin(email: string, password: string) {
    setIsLoading(true);
    setErrors([]);

    let res;

    try {
      res = await fetch("http://localhost:5005/auth/signin", {
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
    } catch (err) {
      console.error(err);
    }

    const json = await res?.json();

    if (!res?.ok) {
      if (json?.errors) {
        setErrors(json.errors || []);
      }

      setIsLoading(false);

      return;
    }

    setUser(json);
    closeLoginFormModal();
    setIsLoading(false);
    markLoggingIn();
  }

  async function signout() {
    setIsLoading(true);
    setErrors([]);

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
    markLoggingIn();
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

  const isPreviouslyLoggedIn = checkLoggingInMark();

  return {
    user,
    isLoading,
    errors,
    loginFormModalRef,
    showLoginFormModal,
    isPreviouslyLoggedIn,
    signup,
    signin,
    signout,
  } as UserCtx;
}
