"use client";
import { useEffect, ComponentType, JSX } from "react";
import { useRouter } from "next/navigation";

export const withAuth = (Component: ComponentType) => {
  const AuthComponent = (props: JSX.IntrinsicAttributes) => {
    const router = useRouter();
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        router.replace("/login");
      }
    }, [token, router]);

    if (!token) return null;

    // return the component that was wrapped
    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
