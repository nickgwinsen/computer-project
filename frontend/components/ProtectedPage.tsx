"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/providers/authProvider";
import { ReactNode, useEffect, useState } from "react";
import { API_URL } from "@/config/constants";
import axiosInstance from "@/config/axios";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { token, setToken } = useAuth();
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  const verifyToken = async () => {
    try {
      console.log("Verifying auth token");
      const res = await axiosInstance.get(`${API_URL}/verify-token`);
      if (res.status === 200) {
        setVerified(true);
      }
    } catch (error) {
      console.error("Error verifying token", error);
      setToken("");
      router.push("/login");
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setVerified(false);
      router.push("/login");
    }
  }, [token, router]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedPage;
