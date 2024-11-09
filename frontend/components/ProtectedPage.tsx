"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/providers/authProvider";
import { ReactNode, useEffect } from "react";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    //just good practice to add all the dependencies
  }, [token, router]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedPage;
