"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/providers/authProvider";
import { ReactNode, useEffect } from "react";

const AuthenticatedPage = ({ children }: { children: ReactNode }) => {
  const { token, verified } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token || !verified) {
    console.log("Token", token, " Verified ", verified);
    return "You are not verified.";
  }

  return <>{children}</>;
};

export default AuthenticatedPage;
