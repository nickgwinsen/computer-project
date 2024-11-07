"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/config/constants";
import { useRouter } from "next/router";

export default function Protected() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const {
    data: verified,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/verify-token/${token}`);
        if (res.status !== 200) {
          throw new Error("Token invalid");
        }
      } catch (error) {
        console.log("Error verifying token", error);
        localStorage.removeItem("token");
        router.push("/");
      }
    },
    enabled: true,
  });

  return (
    <>
      <div>authenticated route</div>
    </>
  );
}
