"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
const ProtectedPage = () => {
  return (
    <ProtectedRoute>
      <h1> Protected </h1>
    </ProtectedRoute>
  );
};

export default ProtectedPage;
