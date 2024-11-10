"use client";
import { useAuth } from "../providers/authProvider";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }
  return <h1>Protected Route</h1>;
};

export default ProtectedRoute;
