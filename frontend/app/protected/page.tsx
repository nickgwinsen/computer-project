"use client";
import { withAuth } from "@/components/withAuth";

const ProtectedPage = () => {
  return (
    <>
      <div>authenticated route</div>
    </>
  );
};

export default withAuth(ProtectedPage);
