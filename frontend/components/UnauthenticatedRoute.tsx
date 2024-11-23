"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/authProvider";

const UnauthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return null;
  }
  if (isAuthenticated) {
    console.log("authenticated, redirecting to home page");
    router.push("/");
    return null;
  }

  return children;
};

export default UnauthenticatedRoute;
