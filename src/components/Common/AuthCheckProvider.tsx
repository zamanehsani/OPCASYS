"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext({
  loginModalOpen: false,
  emailVerificationModalOpen: false,
  setEmailVerificationModalOpen: (open: boolean) => {},
  setLoginModalOpen: (open: boolean) => {},
});

const AuthCheckProvider = ({ children }: PropsWithChildren) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [emailVerificationModalOpen, setEmailVerificationModalOpen] =
    useState(false);

  const session = useSession();

  useEffect(() => {
    const user = session.data?.user;
    const isLoading = session.status === "loading";
    if (!isLoading && !user) {
      setLoginModalOpen(true);
      return;
    }
    if (!isLoading && user && user.emailVerified === null) {
      setEmailVerificationModalOpen(true);
      return;
    }
  }, [session]);
  return (
    <AuthContext.Provider
      value={{
        loginModalOpen,
        emailVerificationModalOpen,
        setEmailVerificationModalOpen,
        setLoginModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthCheckProvider;

// hook to use the context

export const useAuthCheck = () => {
  try {
    return useContext(AuthContext);
  } catch (error) {
    throw new Error("useAuthCheck must be used within an AuthCheckProvider");
  }
};
