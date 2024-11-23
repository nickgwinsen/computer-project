"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/authProvider";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  if (!isLoading && !isAuthenticated) {
    console.log("Not authenticated, redirecting to login page");
    router.push("/login");
    return null;
  }

  return children;
};

export default ProtectedRoute;
